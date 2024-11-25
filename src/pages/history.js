import { searchHistoryAtom } from "../../store";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { ListGroup, Button, Card } from "react-bootstrap";
import styles from "@/styles/History.module.css";

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  let parsedHistory = [];

  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  function historyClicked(e, index) {
    e.stopPropagation();
    router.push(`/artwork?${searchHistory[index]}`);
  }

  function removeHistoryClicked(e, index) {
    e.stopPropagation();
    setSearchHistory((current) => {
      let x = [...current];
      x.splice(index, 1);
      return x;
    });
  }
  return (
    <>
      {parsedHistory.length == 0 ? (
        <Card>
          <Card.Body>
            <h4>
              <strong>Nothing Here.</strong> Try searching for some artwork
            </h4>
          </Card.Body>
        </Card>
      ) : (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              key={index}
              onClick={(e) => historyClicked(e, index)}
              className={styles.historyItem}
            >
              {Object.keys(historyItem).map((key) => (
                <span key={key}>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </span>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                Remove &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
}
