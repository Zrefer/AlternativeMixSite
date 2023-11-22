import { FC } from "react";
import { IArticle } from "../../types/article";
import styles from "./article.module.css";
import genStyles from "../../styles/generalStyles.module.css";

const Article: FC<{ article: IArticle }> = ({ article }) => {
  return (
    <article className={`${genStyles.siteBlock} ${styles.article}`}>
      <h2 className={`${genStyles.title} ${styles.title}`}>{article.title}</h2>
      <div className={styles.articleContent}>
        <div className={styles.imageBox}>
          <img
            src={`//mix-servers.com/backend${article.img}`}
            alt={article.altName}
            className={styles.image}
          />
        </div>
        <p className={styles.text}>{article.story}</p>
      </div>
      <div className={styles.bottom}>
        <div className={styles.actions}>
          <button
            type="button"
            name="likeBtn"
            className={`${genStyles.button} ${styles.button} ${
              article.myLike ? styles.likeBtnActive : styles.likeBtn
            }`}
          >
            {article.like}
          </button>
          <button
            type="button"
            name="commentBtn"
            className={`${genStyles.button} ${styles.button} ${styles.commentBtn}`}
          >
            {article.comment_num}
          </button>
        </div>
        <span className={genStyles.smallText}>{article.date}</span>
      </div>
    </article>
  );
};
export default Article;
