import ItemStore from './store';
import ItemSearch from './search';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col p-24">
      <ItemStore />
      <ItemSearch />
    </div>
  )
}
