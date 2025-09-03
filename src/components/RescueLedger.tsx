import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/integrations/supabase/types";
import { Edit2, Save, X, Upload, Image } from "lucide-react";
import { toast } from "sonner";

type Animal = Database['public']['Tables']['animals']['Row'];

const RescueLedger = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', story: '' });
  const [uploading, setUploading] = useState(false);

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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animals.map((animal) => (
            <Card key={animal.id} className="shadow-gentle hover:shadow-sanctuary transition-gentle">
              <CardHeader className="text-center">
                <div className="w-full h-48 mb-4 overflow-hidden rounded-lg relative group">
                  {animal.photo_url ? (
                    <img 
                      src={animal.photo_url} 
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