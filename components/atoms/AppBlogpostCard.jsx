import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import Colors from '../../styles/colors';
import AppAuthor from './AppAuthor';
import minWidth from '../../styles/mediaQuery';

const AppBlogCard = ({ index, url, data }) => (
  <BlogCardLayout>
    {index === -1 && (
      <Image
        src={data.bannerImage}
        alt=""
        width={1000}
        height={280}
        layout="responsive"
        objectFit="cover"
        quality={40}
      />
    )}

    <BlogCardContent>
      <AppAuthor
        authorName={data.authorName}
        timestamp={data.timestamp}
        authorPicture={data.authorPicture}
      />
      <Link href={url}>
        <a>
          <h3>{data.title}</h3>
        </a>
      </Link>
      <div>
        {data.tags.map((tag) => (
          <span key={tag.id}>#{tag.title}</span>
        ))}
      </div>
    </BlogCardContent>
  </BlogCardLayout>
);

const BlogCardLayout = styled.article`
  margin: 8px 8px 0;
  background-color: ${Colors.white};
  border: 1px solid ${Colors.mediumGray};
  border-radius: 6px;
  overflow: hidden;

  ${minWidth('md')} {
    margin: 0 0 12px;
  }
`;

const BlogCardContent = styled.div`
  padding: 16px 24px 24px;

  & > a {
    text-decoration: none;
    color: ${Colors.darkBlue};

    h3 {
      display: block;
      margin-top: 12px;
      display: -webkit-box;
      font-size: 20px;
      font-weight: 600;
      line-height: 1.2;
      max-height: 70px;
      overflow: hidden;
      text-overflow: ellipsis;
      box-orient: vertical;
      -webkit-box-orient: vertical;
      line-clamp: 2;
      -webkit-line-clamp: 2;

      ${minWidth('md')} {
        margin-top: 14px;
        font-size: 24px;
      }
    }
  }

  & > div {
    margin-top: 12px;
    span {
      display: inline-block;
      margin-right: 0.8rem;
      color: ${Colors.gray};
      font-size: 14px;
    }
  }
`;

AppBlogCard.propTypes = {
  index: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

export default AppBlogCard;
