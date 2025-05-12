/*
  # Initial Schema Setup for Virtual Herbal Garden

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `name` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `plants`
      - `id` (uuid, primary key)
      - `botanical_name` (text)
      - `common_name` (text)
      - `ayush_system` (text[])
      - `description` (text)
      - `habitat` (text)
      - `uses` (text[])
      - `cultivation` (text)
      - `images` (jsonb)
      - `model_3d` (text)
      - `audio` (text)
      - `videos` (text[])
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `bookmarks`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `plant_id` (uuid, references plants)
      - `created_at` (timestamp)
    
    - `garden_plants`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `plant_id` (uuid, references plants)
      - `planted_date` (timestamp)
      - `last_watered` (timestamp)
      - `notes` (text[])
      - `status` (text)
      - `progress` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create plants table
CREATE TABLE IF NOT EXISTS plants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  botanical_name text NOT NULL,
  common_name text NOT NULL,
  ayush_system text[] NOT NULL,
  description text NOT NULL,
  habitat text NOT NULL,
  uses text[] NOT NULL,
  cultivation text NOT NULL,
  images jsonb NOT NULL,
  model_3d text,
  audio text,
  videos text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  plant_id uuid REFERENCES plants ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, plant_id)
);

-- Create garden_plants table
CREATE TABLE IF NOT EXISTS garden_plants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  plant_id uuid REFERENCES plants ON DELETE CASCADE NOT NULL,
  planted_date timestamptz NOT NULL,
  last_watered timestamptz,
  notes text[],
  status text NOT NULL DEFAULT 'healthy',
  progress integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('healthy', 'needs_attention', 'diseased')),
  CONSTRAINT valid_progress CHECK (progress >= 0 AND progress <= 100)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE plants ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE garden_plants ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Plants policies (publicly readable)
CREATE POLICY "Anyone can view plants"
  ON plants
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Bookmarks policies
CREATE POLICY "Users can view their own bookmarks"
  ON bookmarks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookmarks"
  ON bookmarks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks"
  ON bookmarks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Garden plants policies
CREATE POLICY "Users can view their own garden plants"
  ON garden_plants
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create garden plants"
  ON garden_plants
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own garden plants"
  ON garden_plants
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own garden plants"
  ON garden_plants
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to handle profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();