import { useEffect, useState } from 'react';
import '../style.css'
import { db } from "../../server/firebase-config";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from '../auth/AuthUserProvider';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Saved() {
  const [savedArticleIDs, setSavedArticleIDs] = useState<string[]>([]);
  const [savedArticles, setSavedArticles] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const fetchIDs = async () => {
        try {
          const currentUserId = user.uid;
          console.log(currentUserId);
          const usersSavedRef = doc(db, 'users', currentUserId);
          const snapshot = await getDoc(usersSavedRef);

          if (snapshot.exists()) {
            const userData = snapshot.data();
            const articlesArray = userData.savedArticlesArray || [];
            setSavedArticleIDs(articlesArray);
          } else {
            console.log('User document not found.');
          }
        } catch (error) {
          console.error('Error fetching user document:', error);
        }
      };

      fetchIDs();
    } else {
      console.log('No user is currently logged in.');
    }
  }, [user]);

  useEffect(() => {
    const loadSavedArticles = async () => {
      try {
        const mapID = savedArticleIDs.map(async (articleID) => {
          const articleRef = doc(db, 'savedArticles', articleID);
          const article = await getDoc(articleRef);

          if (article.exists()) {
            return article.data();
          } else {
            console.log(`Article with ID ${articleID} not found.`);
            return null;
          }
        });

        Promise.all(mapID)
          .then((articlesData) => {
            setSavedArticles(articlesData.filter((article) => article !== null));
          })
          .catch((error) => {
            console.error('Error retrieving saved articles:', error);
          });
      } catch (error) {
        console.error('Error loading saved articles:', error);
      }
    };

    if (savedArticleIDs.length > 0) {
      loadSavedArticles();
    }
  }, [savedArticleIDs]);

  const deletePost = async (articleIndex: number) => {
    if (user) {
      const articleid = savedArticleIDs[articleIndex];

      try {
        await deleteDoc(doc(db, 'savedArticles', articleid));
        const updated = savedArticles.filter((article) => article.id !== articleid);
        setSavedArticles(updated);

        const savedRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(savedRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const articlesArray = userData.savedArticlesArray || [];
          const updated = articlesArray.filter((id: any) => id !== articleid );

          await updateDoc(savedRef, {
            savedArticlesArray: updated,
          });

          setSavedArticleIDs(updated);
          alert("Article deleted succesfully!")
        }
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    } else {
      console.log('No user is currently logged in.');
    }
  };

  return (
    <div className="backGround">
      <h2 className = "mx-4">Saved Articles:</h2>
      <Stack gap={3}>
        {savedArticles && savedArticles.length > 0 ? (
          savedArticles.map((article: any, index: number) => (
            <Card key = {index} className="mx-4">
              <Card.Body>
                <Card.Link href={article.url} target="_blank" rel="noopener noreferrer">
                <Card.Title>{article.title}</Card.Title>
                </Card.Link>
              <Row>
                <Col>
                <Card.Subtitle>{article.description}</Card.Subtitle>
                </Col>
                <Col>
                <Button className="btn float-end" onClick={() => deletePost(index)}> Delete</Button>
                </Col>
              </Row>
              </Card.Body>
            </Card>
          ))
        ) : (
          
            <p className = 'text-center mb-4'>No saved articles yet.</p>
          
        )}
      </Stack>
    
     </div>
  );
}

export default Saved;
