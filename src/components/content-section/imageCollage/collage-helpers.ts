export function getNumberOfColumns(containerSelector: string) {
  //eslint-disable-next-line
  const container: any = document.querySelector(containerSelector);
  if (!container) return 0; // Return 0 if the container is not found

  const containerWidth = container.offsetWidth;
  const gap = 10; // Gap between columns
  const minColumnWidth = 200; // Minimum column width

  // Calculate the maximum number of columns that fit without gaps
  const maxColumns = Math.floor(containerWidth / minColumnWidth);

  // Calculate the total width used by the gaps for the maximum number of columns
  const totalGapWidth = gap * (maxColumns - 1);
  let totalColumnWidth = minColumnWidth * maxColumns + totalGapWidth;

  // If total width exceeds container width, reduce the number of columns
  let numberOfColumns = maxColumns;
  while (totalColumnWidth > containerWidth && numberOfColumns > 0) {
    numberOfColumns--;
    totalColumnWidth =
      minColumnWidth * numberOfColumns + gap * (numberOfColumns - 1);
  }

  return numberOfColumns;
}

// Takes in columns, index of card, and the total card count,
// Returns
export const getSpannedCard = (
  columns: number,
  cardIndex: number,
  totalCards: number
) => {
  const wide = "card-wide";
  const tall = "card-tall";
  const square = "card-tall card-wide"; // Added for completeness

  // Check if the card can be tall
  const isTall = (index: number) =>
    index % columns === 0 && index + columns < totalCards;

  // Check if the card can be wide
  const isWide = (index: number) =>
    index % (columns * 2) === 0 && index + 1 < totalCards;

  // Check if the card can be square (2x2)
  const isSquare = (index: number) =>
    index % (columns * 2) === 2 && index + columns + 1 < totalCards;

  switch (columns) {
    case 7:
      if (isTall(cardIndex)) {
        return tall;
      } else if (isWide(cardIndex)) {
        return wide;
      } else if (isSquare(cardIndex)) {
        return square;
      }
      break;

    case 6:
      if (isTall(cardIndex)) {
        return tall;
      } else if (isWide(cardIndex)) {
        return wide;
      } else if (isSquare(cardIndex)) {
        return square;
      }
      break;

    case 5:
      if (isTall(cardIndex)) {
        return tall;
      } else if (isWide(cardIndex)) {
        return wide;
      } else if (isSquare(cardIndex)) {
        return square;
      }
      break;

    case 4:
      if (isTall(cardIndex)) {
        return tall;
      } else if (cardIndex % 4 === 2 && cardIndex + 1 < totalCards) {
        return wide;
      }
      break;

    case 3:
      if (isTall(cardIndex)) {
        return tall;
      }
      break;

    default:
      return "";
  }

  // Default case to return an empty string for unallocated cards
  return "";
};
