import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "next/error";
import { Pagination, Row, Col, Card } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import validObjectIDList from "/public/data/validObjectIDList.json";

const PER_PAGE = 12;

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Artwork({ objectID }) {
  const [artworkList, setArtworkList] = useState();
  const [page, setPage] = useState(1);

  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`,
    fetcher
  );

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < artworkList.length) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (data) {
      let filteredResults = validObjectIDList.objectIDs.filter((x) =>
        data.objectIDs?.includes(x)
      );
      const results = [];
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  if (error) return <Error statusCode={404} />;

  if (!artworkList) return null;

  console.log(artworkList);

  return (
    <>
      <Row className="gy-4">
        {artworkList.length > 0 ? (
          artworkList[page - 1].map((currentObjectID) => {
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
                <h4>Nothing Here</h4>
                <p>Try searching for something else</p>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      {artworkList.length > 0 && (
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  );
}
