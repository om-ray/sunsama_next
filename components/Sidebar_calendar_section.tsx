import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Radio,
} from "@mui/material";
import React from "react";

function Sidebar_calendar_section() {
  const [selectedValue, setSelectedValue] = React.useState(true);

  const handleChange = () => {
    setSelectedValue(!selectedValue);
  };

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
          primary="Calendars"
        ></ListItemText>
      </ListItem>
      <ListItem sx={{ height: "1rem" }}>
        <ListItemButton
          sx={{
            marginX: "1rem",
            color: "black",
            ":hover": {
              backgroundColor: "#7BADFF",
              color: "white",
            },
            ":hover > ListItemText": {
              color: "white",
            },
          }}
        >
          <Radio
            size="small"
            sx={{ height: "1rem", width: "fit-content" }}
            value={selectedValue}
            checked={selectedValue}
            onChange={handleChange}
            onClick={handleChange}
          ></Radio>
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
            secondary="calendar"
          ></ListItemText>
        </ListItemButton>
      </ListItem>
    </List>
  );
}

export default Sidebar_calendar_section;
