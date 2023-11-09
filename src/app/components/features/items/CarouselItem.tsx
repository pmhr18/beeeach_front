import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

interface CarouselItemProps {
  item_id: number;
  item_name: string;
  brewery: string;
  style: string;
  image_url: string;
  width: number;
  height: number;
  likes: number;
}

function CarouselItem ({ item_id, item_name, brewery, style, image_url, width, height, likes }:CarouselItemProps ) {
  return (
    <Link href={`/items/${item_id}`}>
      <div className='carousel-item'>
        <div className='card card-compact card-bordered w-80'>
          <figure>
            <div className='absolute top-5 left-5 badge badge-lg badge-accent'>
              {style}
            </div>
            <Image
              src={image_url}
              alt={item_name}
              width={width}
              height={height}
            />
          </figure>
          <div className='card-body'>
            <div className='card-title'>{item_name}</div>
            <div>{brewery}</div>
            <div className='ml-auto'>
              <FontAwesomeIcon icon={faHeart} className="pr-2 fa-lg" />
              {likes}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarouselItem;