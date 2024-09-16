export interface EventFromApi {
  id: number;
  type: 'inner' | 'outer';
  status: 'open' | 'closed';
  preview_image_url: string | null;
  image_url: string | null;
  title: string;
  summary: string;
  content: string;
  date_start: string;
  date_end: string;
  address?: string;
  address_link?: string;
  website?: string;
  video?: string;
  presentation?: string;
  link_video_translation?: string;
}
export interface Event {
  id: number;
  type: 'inner' | 'outer';
  status: 'open' | 'closed';
  preview_image_url: string | null;
  image_url: string | null;
  title: string;
  summary: string;
  content: string;
  date_start: number;
  date_end: number;
  address?: string;
  address_link?: string;
  website?: string;
  video?: string;
  presentation?: string;
  link_video_translation?: string;
}
