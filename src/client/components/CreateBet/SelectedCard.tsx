import { Box, Button, Card, CardMedia, Typography } from "@mui/material"
import React from "react"
const SelectedCard = ({
  image,
  name,
  onClick,
}: {
  image: string | null
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
        {image ? (
          <CardMedia image={image} sx={{ height: 60, width: 150, ml: 2 }} />
        ) : (
          <Box width="150px" height="60px" />
        )}
        <Typography variant="h4">{name}</Typography>
        <Button onClick={onClick} sx={{ width: "150px", mr: 2 }}>
          Change
        </Button>
      </Card>
    </Box>
  )
}

export default SelectedCard
