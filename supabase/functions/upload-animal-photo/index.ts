import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Parse form data
    const formData = await req.formData()
    const file = formData.get('file') as File
    const animalId = formData.get('animal_id') as string
    const folder = formData.get('folder') as string || ''

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (!animalId) {
      return new Response(
        JSON.stringify({ error: 'Animal ID is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Verify animal exists
    const { data: animal, error: animalError } = await supabase
      .from('animals')
      .select('id, name')
      .eq('id', animalId)
      .single()

    if (animalError || !animal) {
      console.error('Animal not found:', animalError)
      return new Response(
        JSON.stringify({ error: 'Animal not found' }),
        { 
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${folder}${animalId}-${Date.now()}.${fileExt}`

    console.log(`Uploading file: ${fileName} for animal: ${animal.name}`)

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('animal-photos')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return new Response(
        JSON.stringify({ error: 'Failed to upload file', details: uploadError.message }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('animal-photos')
      .getPublicUrl(fileName)

    // Update animal record with photo URL
    const { error: updateError } = await supabase
      .from('animals')
      .update({ photo_url: publicUrl })
      .eq('id', animalId)

    if (updateError) {
      console.error('Failed to update animal record:', updateError)
      // Still return success since file was uploaded
    }

    return new Response(
      JSON.stringify({
        success: true,
        animal_id: animalId,
        animal_name: animal.name,
        file_path: uploadData.path,
        public_url: publicUrl,
        message: 'Photo uploaded successfully'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'An unexpected error occurred', 
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})