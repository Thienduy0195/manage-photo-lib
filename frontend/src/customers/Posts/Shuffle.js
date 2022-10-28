import React, { useEffect } from 'react';
import { Typography, Button, Empty } from "antd";
import FlipMove from 'react-flip-move';
import articles from './config';
import ListItem from './ShuffleList';
import uuidV4 from 'uuid/v4';
import { SortableCardWrapper } from './Shuffle.styles';
import axios from 'axios';

const { Text, Title } = Typography;
const baseUrl = process.env.REACT_APP_API_SERVER || 'https://localhost:8900/api/v1'
export default function () {
  const [state, setState] = React.useState({
    removedArticles: [],
    view: 'grid',
    order: 'asc',
    sortingMethod: 'chronological',
    enterLeaveAnimation: 'accordionVertical',
    articles: [],
    page: 1,
    last_page: 1
  });

  const getPosts = async () => {
    const result = await axios.get(`${baseUrl}/posts?page=${state.page}`)
    setState({ ...state, articles: [...state.articles, ...result.data], last_page: result.last_page });
  }

  useEffect(() => {
    getPosts()
  }, [state.page])

  function renderArticles() {
    return state.articles.map((article, i) => {
      return (
        <ListItem
          key={i}
          view={state.view}
          index={i}
          {...article}
        />
      );
    });
  }

  const getArticles = () => {
    setState({
      ...state,
      page: state.page + 1
    })
  }

  return (
    <SortableCardWrapper
      id="shuffle"
      className={`isomorphicSortableCardsHolder ${state.view}`}
    >
      <header className="isoControlBar">
        <Title level={2}>
          <Text strong>
            ALL GRAPHICPROSE'S NEWS
          </Text>
        </Title>
      </header>
      {state.articles.length > 0 ? <div className="isoSortableCardsContainer">
        <FlipMove
          staggerDurationBy="30"
          duration={500}
          enterAnimation={state.enterLeaveAnimation}
          leaveAnimation={state.enterLeaveAnimation}
          typeName="ul"
        >
          {renderArticles()}

          <footer key="foot" className="isoAddRemoveControlBar">
            <Button type="dashed" onClick={getArticles} disabled={state.page === state.last_page}>Load more...</Button>
          </footer>
        </FlipMove>
      </div> : <Empty />}
    </SortableCardWrapper>
  );
}
