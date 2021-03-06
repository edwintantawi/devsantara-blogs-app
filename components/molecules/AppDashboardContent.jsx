import Link from 'next/link';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import minWidth from '../../styles/mediaQuery';
import Colors from '../../styles/colors';
import AppHomeContent from './AppHomeContent';
import useAuthContext from '../../hooks/useAuthContext';

const AppDashboardContent = () => {
  const [{ user }] = useAuthContext();
  const [stats, setStats] = useState({});

  const getUserStats = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/user?uid=${user.uid}`
      );
      const responseJson = await response.json();
      setStats(responseJson.result);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getUserStats();
  }, []);

  return (
    <DashboardLayout>
      <h1>Dashboard</h1>
      <div className="stats">
        <DashboardStat>
          <h2>Posts</h2>
          <span>{stats.posts ?? '-'}</span>
        </DashboardStat>
        <DashboardStat>
          <h2>Visitors</h2>
          <span>{stats.visitors ?? '-'}</span>
        </DashboardStat>
        <DashboardStat>
          <h2>Followers</h2>
          <span>-</span>
        </DashboardStat>
        <DashboardStat>
          <h2>Followings</h2>
          <span>-</span>
        </DashboardStat>
      </div>
      <Link href="/myposts/editor" passHref>
        <DashboardAction>
          <p>Create new Post</p>
        </DashboardAction>
      </Link>
      <h2>Popular Posts</h2>
      <AppHomeContent
        endpoint={`posts/popular/${user.uid}`}
        limit={3}
        editable
      />
      <h2>Latest Posts</h2>
      <div>
        <AppHomeContent
          endpoint={`posts/latest/${user.uid}`}
          limit={3}
          seeAllPostAction
          editable
        />
      </div>
    </DashboardLayout>
  );
};

const DashboardLayout = styled.div`
  h1 {
    font-size: 24px;
    padding: 16px 16px 0;

    ${minWidth('md')} {
      font-size: 34px;
      padding: 16px 0 0 0;
    }
  }

  & > h2 {
    margin: 32px 16px 8px;
    font-size: 18px;
    ${minWidth('md')} {
      margin: 32px 0 16px;
      font-size: 20px;
    }
  }

  .stats {
    padding: 0 8px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 8px;
    margin-top: 8px;

    ${minWidth('md')} {
      padding: 0;
    }

    ${minWidth('lg')} {
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 16px;
    }
  }
`;

const DashboardStat = styled.div`
  background-color: ${Colors.darkBlue};
  color: ${Colors.white};
  padding: 16px 24px;
  border-radius: 8px;

  h2 {
    font-size: 16px;
    ${minWidth('md')} {
      font-size: 20px;
    }
  }

  span {
    font-size: 12px;
    ${minWidth('md')} {
      font-size: 18px;
    }
  }
`;

const DashboardAction = styled.a`
  display: block;
  margin: 16px 8px 8px;
  padding: 12px 20px;
  border: 2px dashed ${Colors.mediumGray};
  text-decoration: none;
  color: ${Colors.gray};

  &:hover {
    border: 2px dashed ${Colors.gray};
  }

  ${minWidth('md')} {
    padding: 16px 32px;
    margin: 18px 0;
  }

  p {
    text-align: center;
    font-size: 12px;
    ${minWidth('md')} {
      font-size: 14px;
    }
  }
`;

export default AppDashboardContent;
