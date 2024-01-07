import React, { useState, useEffect } from 'react';
import '../style.css'
import { addDoc, collection , arrayUnion, updateDoc,getDoc,  doc } from 'firebase/firestore';
import { db } from '../../server/firebase-config';
import {auth} from '../../server/firebase-config';
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CONFIG from "../../server/consts";

const Entertainment: React.FC = () => {
    const [entertainmentArticles, setEntertainmentArticles] = useState<any[]>([]);
    const [entertainmentArticleIDs, setEntertainmentArticleIDs] = useState<any[]>([]);
    const [savedArticles, setSavedArticles] = useState<any[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);


    useEffect(() => {
      const fetchEntertainmentArticles = async () => {
        try{
          const articleIDRef = doc(db, `articleIDs`, CONFIG.ARTICLE_ID)
          const snapshot = await getDoc(articleIDRef);

          if (snapshot.exists()) {
            const articleIDs = snapshot.data();
            const entertainmentArticlesArray = articleIDs.entertainment || [];
            setEntertainmentArticleIDs(entertainmentArticlesArray);
          } else {
            console.log('Document not found.');
          }

        }
        catch(error){
          console.error('Error fetching articleIDs document:', error);
        }
      };

      fetchEntertainmentArticles();

    }, []);

    useEffect(() => {
      const loadEntertainmentArticles = async () => {
        try {
          const mapID = entertainmentArticleIDs.map(async (articleID) => {
            const articleRef = doc(db, 'entertainmentArticles', articleID);
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
              setEntertainmentArticles(articlesData.filter((article) => article !== null));
            })
            .catch((error) => {
              console.error('Error retrieving saved articles:', error);
            });
        } catch (error) {
          console.error('Error loading saved articles:', error);
        }
      };

      loadEntertainmentArticles();

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

    }, []);


    const currentUser = auth.currentUser;
    const currentUserId = currentUser?.uid;

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
         alert('Article '+ savedArticles + 'saved successfully!');

      } catch (error) {
        console.error('Error saving article:', error);
      }
    };

    return (
        <div className='backGround'>
            <h2 className = "mx-4">Entertainment Articles</h2>
            <Stack gap={3}>
            {entertainmentArticles.map((article: any, index: number) => (
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
           <Button className ="float-end" onClick={() => savePost(article)}> Save</Button>
           </Col>
         </Row>
         </Card.Body>
         </Card>
          ))}
        </Stack>
        </div>


    );
};

export default Entertainment;