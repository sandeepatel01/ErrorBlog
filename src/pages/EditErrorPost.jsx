import { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config.service";
import { useNavigate, useParams } from "react-router-dom";

function EditErrorPost() {
  const [errorPost, setErrorPost] = useState([]);
  const { slug } = useParams;
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getActivePosts(slug).then((post) => {
        if (post) {
          setErrorPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return errorPost ? (
    <div className="py-8">
      <Container>
        <PostForm post={errorPost} />
      </Container>
    </div>
  ) : null;
}

export default EditErrorPost;
