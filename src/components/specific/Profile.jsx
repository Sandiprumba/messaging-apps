import { Stack, Avatar, Typography } from "@mui/material";
import { Face as FaceIcon, AlternateEmail as UserNameIcon, CalendarMonth as CalendarIcon } from "@mui/icons-material";
import moment from "moment";
import PropTypes from "prop-types";
import { transformImage } from "../../lib/features";

const Profile = ({ user }) => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        src={transformImage(user?.avatar?.url)}
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={user?.bio} />
      <ProfileCard heading={"Username"} text={user?.username} Icon={<UserNameIcon />} />
      <ProfileCard heading={"name"} text={user?.name} Icon={<FaceIcon />} />
      <ProfileCard heading={"Joined"} text={moment(user?.createdAt).fromNow()} Icon={<CalendarIcon />} />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} color={"white"} textAlign={"center"}>
    {Icon && Icon}
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color="gray" variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

ProfileCard.propTypes = {
  text: PropTypes.string,
  Icon: PropTypes.node,
  heading: PropTypes.string,
};
export default Profile;
