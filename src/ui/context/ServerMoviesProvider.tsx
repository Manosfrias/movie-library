import { getFiltersFromCookies } from '../lib/cookies';
import { ClientMoviesProvider } from './ClientMoviesProvider';

export default function ServerMoviesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialFilters = getFiltersFromCookies();

  return (
    <ClientMoviesProvider initialFilters={initialFilters}>
      {children}
    </ClientMoviesProvider>
  );
}
