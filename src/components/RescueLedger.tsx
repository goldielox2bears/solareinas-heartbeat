import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Edit2, Save, X, Upload, Image, Plus } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Animal = Database['public']['Tables']['animals']['Row'];

const RescueLedger = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', story: '' });
  const [uploading, setUploading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAnimal, setNewAnimal] = useState({
    name: '',
    species: '',
    age: '',
    story: ''
  });
  const [creating, setCreating] = useState(false);
  const [newAnimalPhoto, setNewAnimalPhoto] = useState<File | null>(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const { data, error } = await supabase
          .from('animals')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setAnimals(data || []);
      } catch (error) {
        console.error('Error fetching animals:', error);
        setAnimals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  const startEditing = (animal: Animal) => {
    setEditingId(animal.id);
    setEditForm({ name: animal.name, story: animal.story || '' });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({ name: '', story: '' });
  };

  const handlePhotoUpload = async (animalId: string, file: File) => {
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${animalId}.${fileExt}`;
      const filePath = `animals/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('animal-photos')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('animal-photos')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('animals')
        .update({ photo_url: data.publicUrl })
        .eq('id', animalId);

      if (updateError) throw updateError;

      // Update local state
      setAnimals(prev => prev.map(animal => 
        animal.id === animalId 
          ? { ...animal, photo_url: data.publicUrl }
          : animal
      ));

      toast.success('Photo updated successfully!');
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  const saveChanges = async (animalId: string) => {
    try {
      const { error } = await supabase
        .from('animals')
        .update({
          name: editForm.name,
          story: editForm.story
        })
        .eq('id', animalId);

      if (error) throw error;

      // Update local state
      setAnimals(prev => prev.map(animal => 
        animal.id === animalId 
          ? { ...animal, name: editForm.name, story: editForm.story }
          : animal
      ));

      setEditingId(null);
      setEditForm({ name: '', story: '' });
      toast.success('Animal updated successfully!');
    } catch (error) {
      console.error('Error updating animal:', error);
      toast.error('Failed to update animal');
    }
  };

  const createAnimal = async () => {
    if (!newAnimal.name || !newAnimal.species) {
      toast.error('Please provide at least a name and species');
      return;
    }

    setCreating(true);
    try {
      const animalData = {
        name: newAnimal.name,
        species: newAnimal.species,
        age: newAnimal.age ? parseInt(newAnimal.age) : null,
        story: newAnimal.story || null,
        sponsor_status: 'available' as const
      };

      const { data, error } = await supabase
        .from('animals')
        .insert([animalData])
        .select()
        .single();

      if (error) throw error;

      // Upload photo if provided
      if (newAnimalPhoto) {
        const fileExt = newAnimalPhoto.name.split('.').pop();
        const fileName = `${data.id}.${fileExt}`;
        const filePath = `animals/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('animal-photos')
          .upload(filePath, newAnimalPhoto, { upsert: true });

        if (!uploadError) {
          const { data: urlData } = supabase.storage
            .from('animal-photos')
            .getPublicUrl(filePath);

          // Update the animal with photo URL
          const { error: updateError } = await supabase
            .from('animals')
            .update({ photo_url: urlData.publicUrl })
            .eq('id', data.id);

          if (!updateError) {
            data.photo_url = urlData.publicUrl;
            console.log('Photo uploaded successfully:', urlData.publicUrl);
          } else {
            console.error('Error updating photo URL:', updateError);
          }
        } else {
          console.error('Error uploading photo:', uploadError);
        }
      }

      // Add to local state
      setAnimals(prev => [data, ...prev]);
      
      // Reset form
      setNewAnimal({ name: '', species: '', age: '', story: '' });
      setNewAnimalPhoto(null);
      setShowAddForm(false);
      
      toast.success(`${data.name} has been added to the sanctuary!`);
    } catch (error) {
      console.error('Error creating animal:', error);
      toast.error('Failed to add animal');
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 px-6 bg-gradient-peaceful">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">Loading our rescue family...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 bg-gradient-peaceful">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-foreground mb-4">
            Rescue Ledger
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Meet the souls you've helped save. Each animal carries a story of transformation, 
            made possible by the generosity of our Stewards.
          </p>
        </div>
        
        {/* Add New Animal Button */}
        <div className="mb-8 text-center">
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="mb-4"
            variant={showAddForm ? "outline" : "default"}
          >
            <Plus className="w-4 h-4 mr-2" />
            {showAddForm ? 'Cancel' : 'Add New Animal'}
          </Button>
        </div>

        {/* Add Animal Form */}
        {showAddForm && (
          <Card className="mb-8 shadow-gentle">
            <CardHeader>
              <CardTitle className="text-xl font-medium text-foreground">
                Add New Animal to Sanctuary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Input
                    placeholder="Animal name"
                    value={newAnimal.name}
                    onChange={(e) => setNewAnimal(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Select
                    value={newAnimal.species}
                    onValueChange={(value) => setNewAnimal(prev => ({ ...prev, species: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select species" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Horse">Horse</SelectItem>
                      <SelectItem value="Goat">Goat</SelectItem>
                      <SelectItem value="Sheep">Sheep</SelectItem>
                      <SelectItem value="Dog">Dog</SelectItem>
                      <SelectItem value="Cat">Cat</SelectItem>
                      <SelectItem value="Mule">Mule</SelectItem>
                      <SelectItem value="Donkey">Donkey</SelectItem>
                      <SelectItem value="Pig">Pig</SelectItem>
                      <SelectItem value="Cow">Cow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Input
                  placeholder="Age (optional)"
                  type="number"
                  value={newAnimal.age}
                  onChange={(e) => setNewAnimal(prev => ({ ...prev, age: e.target.value }))}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Animal's rescue story..."
                  value={newAnimal.story}
                  onChange={(e) => setNewAnimal(prev => ({ ...prev, story: e.target.value }))}
                  className="min-h-[100px]"
                />
              </div>
              
              {/* Photo Upload Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Photo (optional)</label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                  {newAnimalPhoto ? (
                    <div className="space-y-3">
                      <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden">
                        <img 
                          src={URL.createObjectURL(newAnimalPhoto)} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">{newAnimalPhoto.name}</p>
                      <Button
                        onClick={() => setNewAnimalPhoto(null)}
                        variant="outline"
                        size="sm"
                      >
                        Remove Photo
                      </Button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setNewAnimalPhoto(file);
                        }}
                      />
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload a photo
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        JPG, PNG up to 10MB
                      </p>
                    </label>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={createAnimal}
                  disabled={creating || !newAnimal.name || !newAnimal.species}
                  className="flex-1"
                >
                  {creating ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  Add to Sanctuary
                </Button>
                <Button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewAnimal({ name: '', species: '', age: '', story: '' });
                    setNewAnimalPhoto(null);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animals.map((animal) => (
            <Card key={animal.id} className="shadow-gentle hover:shadow-sanctuary transition-gentle">
              <CardHeader className="text-center">
                <div className="w-full h-48 mb-4 overflow-hidden rounded-lg relative group">
                   {animal.photo_url ? (
                     <img 
                       src={`${animal.photo_url}?t=${Date.now()}`}
                       alt={animal.name}
                       className="w-full h-full object-cover"
                     />
                   ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-4xl">
                      {animal.species === 'Horse' ? '🐴' : 
                       animal.species === 'Goat' ? '🐐' : 
                       animal.species === 'Sheep' ? '🐑' : 
                       animal.species === 'Dog' ? '🐕' :
                       animal.species === 'Cat' ? '🐱' : 
                       animal.species === 'Mule' ? '🐴' : '🐾'}
                    </div>
                  )}
                  
                  {/* Photo upload overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handlePhotoUpload(animal.id, file);
                        }}
                        disabled={uploading}
                      />
                      <div className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-colors">
                        {uploading ? (
                          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Upload className="w-6 h-6 text-primary" />
                        )}
                      </div>
                    </label>
                  </div>
                </div>
                
                {/* Edit mode for name */}
                {editingId === animal.id ? (
                  <div className="space-y-3">
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="text-center font-medium"
                      placeholder="Animal name"
                    />
                  </div>
                ) : (
                  <CardTitle className="text-xl font-medium text-foreground">
                    {animal.name}
                  </CardTitle>
                )}
                
                <p className="text-muted-foreground">{animal.species}</p>
                {animal.age && (
                  <p className="text-sm text-muted-foreground">Age: {animal.age}</p>
                )}
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Edit mode for story */}
                {editingId === animal.id ? (
                  <div className="space-y-3">
                    <Textarea
                      value={editForm.story}
                      onChange={(e) => setEditForm(prev => ({ ...prev, story: e.target.value }))}
                      placeholder="Animal's story..."
                      className="min-h-[100px] text-sm"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => saveChanges(animal.id)}
                        size="sm"
                        className="flex-1"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        onClick={cancelEditing}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {animal.story && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {animal.story}
                      </p>
                    )}
                    
                    <Button
                      onClick={() => startEditing(animal)}
                      variant="outline"
                      size="sm"
                      className="w-full mb-2"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Details
                    </Button>
                  </>
                )}
                
                {/* Sponsorship status (only show when not editing) */}
                {editingId !== animal.id && (
                  <>
                    {animal.sponsor_status === 'sponsored' && animal.sponsor_name ? (
                      <div className="p-3 bg-sanctuary-sage/20 rounded-lg">
                        <p className="text-xs text-foreground font-medium">
                          Sponsored by {animal.sponsor_name}
                        </p>
                      </div>
                    ) : animal.sponsor_status === 'pending' ? (
                      <div className="p-3 bg-yellow-100 rounded-lg">
                        <p className="text-xs text-foreground font-medium">
                          Sponsorship Pending
                        </p>
                      </div>
                    ) : (
                      <Button variant="steward" size="sm" className="w-full">
                        Become {animal.name}'s Steward
                      </Button>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {animals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No animals in our sanctuary yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RescueLedger;