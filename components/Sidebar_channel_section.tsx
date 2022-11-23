import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import React from "react";

function Sidebar_channel_section() {
  return (
    <List>
      <ListItem>
        <ListItemText
          sx={{
            textTransform: "uppercase",
            height: "fit-content",
            ".MuiListItemText-primary": {
              fontSize: "12px",
              fontFamily: "Avenir",
              fontWeight: "bold",
              color: "black",
              marginLeft: "1rem",
            },
          }}
          primary="Channels"
        ></ListItemText>
      </ListItem>
      <ListItem sx={{ height: "1rem" }}>
        <ListItemButton
          sx={{
            marginX: "1rem",
            color: "black",
            ":hover": {
              backgroundColor: "rgb(34 197 94)",
              color: "white",
            },
            ":hover > ListItemText": {
              color: "white",
            },
          }}
        >
          <ListItemText
            sx={{
              height: "1rem",
              padding: "0",
              ".MuiListItemText-secondary": {
                fontSize: "12px",
                fontFamily: "Avenir",
                color: "inherit",
              },
            }}
            secondary="#all"
          ></ListItemText>
        </ListItemButton>
      </ListItem>
    </List>
  );
}

export default Sidebar_channel_section;
