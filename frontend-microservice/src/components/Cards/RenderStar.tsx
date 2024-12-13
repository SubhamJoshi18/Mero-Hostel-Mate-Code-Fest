import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

export const RenderStar = (rating: number) => {
  const totalStars = 5;
  const stars = [];
  for (let i = 0; i < totalStars; i++) {
    stars.push(
      i < rating ? (
        <StarIcon key={i} style={{ color: "gold" }} />
      ) : (
        <StarOutlineIcon key={i} style={{ color: "gold" }} />
      )
    );
  }
  return stars;
};
