import appwriteService from "../appwrite/config.service";
import { Container, PostCard } from "../components";
import { useState, useEffect } from "react";

function AllErrorPosts() {
  const [errorPosts, setErrorPosts] = useState([]);

  useEffect(() => {
    appwriteService.getActivePosts().then((errorPosts) => {
      if (errorPosts) {
        setErrorPosts(errorPosts.documents);
      }
    });
  }, []);

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

export default AllErrorPosts;
