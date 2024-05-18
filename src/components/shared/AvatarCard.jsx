import PropTypes from "prop-types";
import { Stack, AvatarGroup, Box, Avatar } from "@mui/material";
import { transformImage } from "../../lib/features";

//todo transform
const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup max={max} sx={{ position: "relative" }}>
        <Box width={"5rem"} height={"3rem"}>
          {avatar.map((i, index) => {
            return (
              <Avatar
                key={Math.random() * 100}
                src={transformImage(i)}
                alt={`Avatar ${index}`}
                sx={{
                  width: "3rem",
                  height: "3rem",
                  position: "absolute",
                  left: {
                    xs: `${0.5 + index}rem`,
                    sm: `${index}rem`,
                  },
                }}
              />
            );
          })}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

AvatarCard.propTypes = {
  avatar: PropTypes.arrayOf(PropTypes.string),
  max: PropTypes.number,
};

export default AvatarCard;
