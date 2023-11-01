import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Button } from "antd";

const CommentPage = () => {
  const { TextArea } = Input;
  const getComment = () => {
    const storedComments = JSON.parse(localStorage.getItem("comments"));
    return storedComments || [];
  };
  const [comments, setComments] = useState(getComment);
  const [newComments, setNewComments] = useState("");
  const [username, setUsername] = useState("");

  // Save comments to localStorage whenever comments change
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleClick = (e) => {
    e.preventDefault();

    const timestamp = new Date().toLocaleTimeString();
    if (newComments.trim() === "" || username.trim() === "") {
      alert("Username or comment should not be empty");
    } else {
      const commentDetails = {
        username,
        timestamp,
        text: newComments,
      };
      setComments([...comments, commentDetails]);
      setNewComments("");
      setUsername("");
    }
  };

  return (
    <div className=" h-screen bg-orange-300 flex justify-center">
      <div className="">
        <h2 className="text-center text-2xl mt-2 mb-4 font-bold">
          Comment page
        </h2>
        <Input
          className="mb-4"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
        <TextArea
          className="mb-4"
          rows={4}
          placeholder="Comment here..."
          value={newComments}
          onChange={(e) => setNewComments(e.target.value)}
        />

        <Button
          className="bg-blue-400 mb-4 font-semibold"
          type="primary"
          onClick={handleClick}
        >
          Comment
        </Button>

        <div>
          {
            <ul>
              {comments.map((comment, idx) => (
                <li key={idx}>
                  <span className="text-xs ">Commented by </span>{" "}
                  <span className="font-medium">
                    {comment.username}{" "}
                    <span className="text-xs">at {comment.timestamp}</span>
                  </span>
                  <p className="font-semibold">{comment.text}</p>
                </li>
              ))}
            </ul>
          }
        </div>
      </div>
    </div>
  );
};

export default CommentPage;
