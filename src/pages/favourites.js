import { favouritesAtom } from "../../store";
import { useAtom } from "jotai";
import { Row, Col, Card } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  return (
    <>
      <Row className="gy-4">
        {favouritesList.length > 0 ? (
          favouritesList.map((currentObjectID) => {
            return (
              <Col lg={3} key={currentObjectID}>
                <ArtworkCard objectID={currentObjectID} />
              </Col>
            );
          })
        ) : (
          <Col>
            <Card>
              <Card.Body>
                <h4>
                  <strong>Nothing Here</strong> Try adding some new artwork to
                  the list
                </h4>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
}
