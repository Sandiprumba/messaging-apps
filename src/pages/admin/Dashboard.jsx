import AdminLayout from "../../components/layout/AdminLayout";
import { Container, Paper, Stack, Typography, Box, Skeleton } from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Notifications as NotificationsIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import moment from "moment";
import { CurveButton, SearchField } from "../../components/styles/StyledComponents";
import { matteBlack } from "../../constants/color";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";
import { useFetchData } from "6pp";
import { server } from "../../constants/config";
import { LayoutLoader } from "../../components/layout/Loaders";
import { useErrors } from "../../hooks/hook";

const Dashboard = () => {
  //CACHING IS A TECHNIQUE USED IN SOFTWARE DEVELOPMENT TO STORE COPIES OF FREQUENTLY ACCESSED OR EXPENSIVE TO COMPUTE DATA IN A FAST ACCESS STORAGE LOCATION IN THE CONTEXT OF WEB DEVELOPMENT AND API REQUEST
  //here dashboard-stats is provided as a identifier for chaching mechanism
  const { loading, data, error } = useFetchData(`${server}/api/v1/admin/stats`, "dashboard-stats");

  const { stats } = data || {};

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon
          sx={{
            fontSize: "3rem",
          }}
        />
        <SearchField placeholder="search..." />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography
          display={{
            xs: "none",
            lg: "block",
          }}
          color={"rgba(0,0,0,0.9"}
          textAlign={"center"}
        >
          {moment().format("dddd, D YYYY")}
        </Typography>
        <NotificationsIcon />
      </Stack>
    </Paper>
  );

  const widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing={"2rem"}
      justifyContent={"space-between"}
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget title={"Users"} value={stats?.usersCount} Icon={<PersonIcon />} />
      <Widget title={"Chats"} value={stats?.totalChatsCount} Icon={<GroupIcon />} />
      <Widget title={"Messages"} value={stats?.messagesCount} Icon={<MessageIcon />} />
    </Stack>
  );

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Container component={"main"}>
          {Appbar}

          <Stack
            direction={{
              xs: "column",
              lg: "row",
            }}
            spacing={"2rem"}
            flexWrap={"wrap"}
            justifyContent={"center"}
            alignItems={{
              xs: "center",
              lg: "stretch",
            }}
            sx={{
              gap: "2rem",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: "1rem 3.5rem",
                borderRadius: "1rem",
                width: "100%",
                maxWidth: "40rem",
              }}
            >
              <Typography margin={"2rem 0"} variant="h5">
                Last Messages
              </Typography>
              {/* displaying data inside the charts */}
              <LineChart value={stats?.messagesChart || []} />
            </Paper>
            <Paper
              elevation={3}
              sx={{
                padding: "1rem",
                borderRadius: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: { xs: "100%", sm: "60%" },
                position: "relative",
                maxWidth: "25rem",
              }}
            >
              <DoughnutChart labels={["Single chats", "Group Chats"]} value={[stats?.totalChatsCount - stats?.groupsCount || 0, stats?.groupsCount || 0]} />

              <Stack position={"absolute"} direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={"0.5rem"} width={"100%"} height={"100%"}>
                <GroupIcon /> <Typography>Vs</Typography>
                <PersonIcon />
              </Stack>
            </Paper>
          </Stack>

          {widgets}
        </Container>
      )}
    </AdminLayout>
  );
};

const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1.5rem",
      width: "20rem",
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: "rgba(0,0,0,0.7)",
          borderRadius: "50%",
          border: `5px solid ${matteBlack}`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </Typography>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default Dashboard;
