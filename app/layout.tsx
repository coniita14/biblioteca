import { RegistroServiceWorker } from './RegistroServiceWorker';

export const metadata = {
  title: 'Biblioteca App',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <RegistroServiceWorker />
        {children}
      </body>
    </html>
  );
}

