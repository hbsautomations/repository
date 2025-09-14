/*
  # Create newsletter and contact tables

  1. New Tables
    - `newsletter_subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique, not null)
      - `created_at` (timestamp with time zone)
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, not null)
      - `company` (text)
      - `message` (text, not null)
      - `created_at` (timestamp with time zone)
  
  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their data
    - Add policy for anon users to insert data
*/

-- Create newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on newsletter subscribers table
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to read all subscribers
CREATE POLICY "Authenticated users can read all subscribers"
  ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy for anon users to insert subscribers
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy for authenticated users to delete subscribers
CREATE POLICY "Authenticated users can delete subscribers"
  ON newsletter_subscribers
  FOR DELETE
  TO authenticated
  USING (true);

-- Create contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on contact submissions table
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to read all submissions
CREATE POLICY "Authenticated users can read all contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy for anon users to insert submissions
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy for authenticated users to delete submissions
CREATE POLICY "Authenticated users can delete contact submissions"
  ON contact_submissions
  FOR DELETE
  TO authenticated
  USING (true);