import { Box, Button, Card, CardMedia, Typography } from "@mui/material"
import React from "react"
const SearchResult = ({
  image,
  name,
  onClick,
}: {
  image: string
  name: string
  onClick: () => void
}) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width="100%"
    >
      <Card
        sx={{
          width: "95%",
          backgroundColor: "#F2F2F2",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CardMedia image={image} sx={{ height: 60, width: 150, ml: 2 }} />
        <Typography variant="h4">{name}</Typography>
        <Button onClick={onClick} sx={{ width: "150px", mr: 2 }}>
          Select
        </Button>
      </Card>
    </Box>
  )
}

export default SearchResult
