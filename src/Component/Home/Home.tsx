import Posts from "../posts/Posts";


export default function Home() {

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
       <Posts />
      </div>
    </div>
  );
}