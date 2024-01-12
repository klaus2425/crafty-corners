import { useState } from "react";
import axiosClient from "../../axios-client";

const GetCommunityMembers = (props) => {
  const [count, setCount] = useState(0);
  axiosClient.get(`/communities/${props.id}/users`)
    .then(({ data }) => {
      setCount(data.members.length);
    })
  return count;

}

export default GetCommunityMembers;