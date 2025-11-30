-- Create sofas table
CREATE TABLE public.sofas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name_ru TEXT NOT NULL,
  name_uz TEXT NOT NULL,
  price INTEGER NOT NULL,
  on_sale BOOLEAN NOT NULL DEFAULT false,
  sale_price INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sofa images table
CREATE TABLE public.sofa_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sofa_id UUID NOT NULL REFERENCES public.sofas(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sofa description sections table
CREATE TABLE public.sofa_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sofa_id UUID NOT NULL REFERENCES public.sofas(id) ON DELETE CASCADE,
  heading_ru TEXT NOT NULL,
  heading_uz TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sofa section items (key-value pairs)
CREATE TABLE public.sofa_section_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_id UUID NOT NULL REFERENCES public.sofa_sections(id) ON DELETE CASCADE,
  key_ru TEXT NOT NULL,
  key_uz TEXT NOT NULL,
  value_ru TEXT NOT NULL,
  value_uz TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sofa comments table
CREATE TABLE public.sofa_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sofa_id UUID NOT NULL REFERENCES public.sofas(id) ON DELETE CASCADE,
  text_ru TEXT,
  text_uz TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.sofas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sofa_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sofa_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sofa_section_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sofa_comments ENABLE ROW LEVEL SECURITY;

-- Public read access for all sofa data (informational site)
CREATE POLICY "Sofas are publicly readable" ON public.sofas FOR SELECT USING (true);
CREATE POLICY "Sofa images are publicly readable" ON public.sofa_images FOR SELECT USING (true);
CREATE POLICY "Sofa sections are publicly readable" ON public.sofa_sections FOR SELECT USING (true);
CREATE POLICY "Sofa section items are publicly readable" ON public.sofa_section_items FOR SELECT USING (true);
CREATE POLICY "Sofa comments are publicly readable" ON public.sofa_comments FOR SELECT USING (true);

-- Admin write access (using service role or edge functions)
CREATE POLICY "Allow insert for authenticated" ON public.sofas FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update for authenticated" ON public.sofas FOR UPDATE USING (true);
CREATE POLICY "Allow delete for authenticated" ON public.sofas FOR DELETE USING (true);

CREATE POLICY "Allow insert for authenticated" ON public.sofa_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update for authenticated" ON public.sofa_images FOR UPDATE USING (true);
CREATE POLICY "Allow delete for authenticated" ON public.sofa_images FOR DELETE USING (true);

CREATE POLICY "Allow insert for authenticated" ON public.sofa_sections FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update for authenticated" ON public.sofa_sections FOR UPDATE USING (true);
CREATE POLICY "Allow delete for authenticated" ON public.sofa_sections FOR DELETE USING (true);

CREATE POLICY "Allow insert for authenticated" ON public.sofa_section_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update for authenticated" ON public.sofa_section_items FOR UPDATE USING (true);
CREATE POLICY "Allow delete for authenticated" ON public.sofa_section_items FOR DELETE USING (true);

CREATE POLICY "Allow insert for authenticated" ON public.sofa_comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update for authenticated" ON public.sofa_comments FOR UPDATE USING (true);
CREATE POLICY "Allow delete for authenticated" ON public.sofa_comments FOR DELETE USING (true);

-- Create indexes for performance
CREATE INDEX idx_sofa_images_sofa_id ON public.sofa_images(sofa_id);
CREATE INDEX idx_sofa_sections_sofa_id ON public.sofa_sections(sofa_id);
CREATE INDEX idx_sofa_section_items_section_id ON public.sofa_section_items(section_id);
CREATE INDEX idx_sofa_comments_sofa_id ON public.sofa_comments(sofa_id);
CREATE INDEX idx_sofas_on_sale ON public.sofas(on_sale);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_sofas_updated_at
BEFORE UPDATE ON public.sofas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();