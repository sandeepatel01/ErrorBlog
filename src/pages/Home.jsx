import { useState, useEffect } from "react";
import appwriteService from "../appwrite/config.service";
import { Container, PostCard } from "../components";

function Home() {
  const [errorPosts, setErrorPosts] = useState([]);

  useEffect(() => {
    appwriteService.getActivePosts().then((errorPost) => {
      if (errorPost) {
        setErrorPosts(errorPost.documents);
      }
    });
  }, []);

  if (errorPosts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {errorPosts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
