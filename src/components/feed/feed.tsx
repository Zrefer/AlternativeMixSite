import { AppDispatch, RootState } from "../../services/store";
import { FC, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Article from "../article/article";
import { Outlet } from "react-router";
import { Status } from "../../types/general";
import { fetchFeed } from "../../services/feed/actions";
import genStyles from "../../styles/generalStyles.module.css";
import styles from "./feed.module.css";

const feedSelector = (store: RootState) => {
  return store.feedStore;
};

const Feed: FC = () => {
  const loadBtnRef = useRef<HTMLButtonElement>(null);
  const dispatch: AppDispatch = useDispatch();

  const feed = useSelector(feedSelector);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;
        if (feed.status === Status.Loading) return;
        if (feed.current_page >= feed.last_page) return;

        dispatch(fetchFeed(feed.current_page + 1));
      },
      { threshold: 0.5 }
    );

    const loadBtnElement = loadBtnRef.current;
    if (loadBtnElement) observer.observe(loadBtnRef.current);

    return () => {
      if (loadBtnElement) observer.unobserve(loadBtnElement);
    };
  }, [dispatch, feed.current_page, feed.last_page, feed.status]);

  const handleLoadMore = () => {
    if (feed.status === Status.Loading) return;
    if (feed.current_page >= feed.last_page) return;

    dispatch(fetchFeed(feed.current_page + 1));
  };

  return (
    <section>
      <ul className={styles.feed}>
        {feed.articles.length > 0 &&
          feed.articles.map((article) => (
            <li key={article.id} className={styles.feedItem}>
              <Article article={article} />
            </li>
          ))}
      </ul>
      {feed.current_page < feed.last_page && (
        <button
          type="button"
          className={`${genStyles.button} ${genStyles.midText} ${styles.loadButton}`}
          ref={loadBtnRef}
          onClick={handleLoadMore}
          disabled={feed.status === Status.Loading}
        >
          {feed.status === Status.Loading
            ? "Загрузка новостей..."
            : "Загрузить ещё"}
        </button>
      )}
      <Outlet />
    </section>
  );
};
export default Feed;
