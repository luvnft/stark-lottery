import HomePage from '@/layouts/Home';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Lottery | StarkArcade',
};

export default function Home() {
  return <HomePage />;
}
