import { FC } from "react";
import { articles } from "../../data";
import styles from "./feed.module.css";
import Article from "../article/article";

const Feed: FC = () => {
  return (
    <section>
      <ul className={styles.feed}>
        {articles.data &&
          articles.data[0].articles.map((article) => (
            <li key={article.id} className={styles.feedItem}>
              <Article article={article} />
            </li>
          ))}
      </ul>
    </section>
  );
};
export default Feed;
