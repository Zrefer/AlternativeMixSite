import { FC } from "react";
import styles from "./feed.module.css";
import Article from "../article/article";
import { RootState } from "../../services/store";
import { useSelector } from "react-redux";

const feedSelector = (store: RootState) => {
  return store.feedStore;
};

const Feed: FC = () => {
  const feed = useSelector(feedSelector);

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
    </section>
  );
};
export default Feed;
