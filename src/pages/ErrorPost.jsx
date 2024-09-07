import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config.service";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function ErrorPost() {
  const [errorPost, setErrorPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor =
    errorPost && userData ? errorPost.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getActivePosts(slug).then((post) => {
        if (post) setErrorPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(errorPost.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(errorPost.featuredImage);
        navigate("/");
      }
    });
  };

  return errorPost ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(errorPost.featuredImage)}
            alt={errorPost.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${errorPost.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{errorPost.title}</h1>
        </div>
        <div className="browser-css">{parse(errorPost.content)}</div>
      </Container>
    </div>
  ) : null;
}
