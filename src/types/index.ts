export interface Plant {
  id: string;
  botanicalName: string;
  commonName: string;
  ayushSystem: AyushSystem[];
  description: string;
  habitat: string;
  uses: string[];
  cultivation: string;
  images: {
    main: string;
    gallery: string[];
  };
  model3d?: string;
  audio?: string;
  videos?: string[];
}

export type AyushSystem = 'Ayurveda' | 'Yoga' | 'Unani' | 'Siddha' | 'Homeopathy';

export interface UserNote {
  id: string;
  plantId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  bookmarkedPlants: string[];
  notes: UserNote[];
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface VirtualTour {
  id: string;
  title: string;
  description: string;
  plants: string[];
  coverImage: string;
  category: string;
  duration: number;
  difficulty: string;
  participants: number;
}

export interface GardenPlant {
  id: string;
  plant: Plant;
  plantedDate: Date;
  lastWatered?: Date;
  notes: string[];
  status: 'healthy' | 'needs_attention' | 'diseased';
  progress: number;
}