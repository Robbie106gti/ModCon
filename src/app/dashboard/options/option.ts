import { Images } from '../access/shared/access';

export interface Option {
  title: string;
  active?: boolean;
  image?: Images;
  description?: string;
  $key?: string;
}

export interface Default {
  title: string;
  image?: Images;
  description?: string;
  $key?: string;
}
