import type { Metadata } from 'next';
import './globals.css';
import { UserProvider } from './context/UserContext';

export const metadata: Metadata = {
  title: 'UniRide – Movilidad universitaria',
  description: 'Plataforma de transporte para universitarios',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}