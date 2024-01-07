import React, { useState, useEffect } from 'react';
import '../style.css'
import { addDoc, collection , arrayUnion, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../server/firebase-config';
import {auth} from '../../server/firebase-config';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CONFIG from "../../server/consts";


const HomeScreen: React.FC = () => {
    const [topArticles, setTopArticles] = useState<any[]>([]);
    const [topArticleIDs, setTopArticleIDs] = useState<any[]>([]);
    //const [savedArticles, setSavedArticles] = useState<any[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
    useEffect(() => {
      const fetchTopArticles = async () => {

        try{
          const articleIDRef = doc(db, `articleIDs`, CONFIG.ARTICLE_ID)
          const snapshot = await getDoc(articleIDRef);

          if (snapshot.exists()) {
            const articleIDs = snapshot.data();
            const topArticlesArray = articleIDs.top || [];
            setTopArticleIDs(topArticlesArray);
          } else {
            console.log('Document not found.');
          }

        }
        catch(error){
          console.error('Error fetching articleIDs document:', error);
        }
      };

      fetchTopArticles();  

    }, [topArticleIDs]);

    useEffect(() => {
      const loadBusinessArticles = async () => {
        try {
          const mapID = topArticleIDs.map(async (articleID) => {
            const articleRef = doc(db, 'articles', articleID);
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
              setTopArticles(articlesData.filter((article) => article !== null));
            })
            .catch((error) => {
              console.error('Error retrieving saved articles:', error);
            });
        } catch (error) {
          console.error('Error loading saved articles:', error);
        }
      };

      loadBusinessArticles();

      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    });
    return () => {
        unsubscribe();
    };

    }, [topArticles]);
  
    const currentUser = auth.currentUser;
    const currentUserId = currentUser?.uid;
    console.log('user id : ' + currentUserId)

    const savePost = async (article: { title: any; description: any; url: any; }) => {
      if (!isLoggedIn) {
        alert('User is not logged in. Please log in to save articles.');
        return;
      };
      try {

        const savedCollectionRef = collection(db, 'savedArticles');
        const addSave = await addDoc(savedCollectionRef, {
          title: article.title,
          description: article.description,
          url: article.url,
        });

        //setSavedArticles(prevSavedArticles => [...prevSavedArticles, article]);
       // console.log("article.id: " + article.id)
          
        const saveRef = doc(db, 'users', currentUserId!);
          try {
            await updateDoc(saveRef, {
              savedArticlesArray: arrayUnion(addSave.id)
            });
            console.log('article now saved');
          } catch (error) {
            console.error('error updating', error);
         }
         alert('Article saved successfully!');

      } catch (error) {
        console.error('Error saving article:', error);
      }
    };
    
  
    return (
      <div className = "backGround">
        <><h2 className="mx-4">Top News:</h2><Stack gap={3}>
        {topArticles.map((article: any, index: number) => (
          <Card key = {index} className="mx-4">
            <Card.Body>

              <Card.Link href={article.url} target="_blank" rel="noopener noreferrer" className = "link-dark link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                <Card.Title> {article.title}</Card.Title>
              </Card.Link>
              <Row>
                <Col>
                  <Card.Subtitle>{article.description}</Card.Subtitle>
                </Col>
                <Col>
                  <Button className ="btn float-end" onClick={() => savePost(article)}> Save</Button>
                </Col>
              </Row>


            </Card.Body>
          </Card>
        ))}
      </Stack></>
      </div>
       
    );
  };
export default HomeScreen;

