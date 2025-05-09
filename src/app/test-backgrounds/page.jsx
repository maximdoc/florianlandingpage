'use client';

import { Container, Row, Col } from 'react-bootstrap';
import PageLayout from '@/components/PageLayout';
import SectionContainer from '@/components/SectionContainer';

export default function TestBackgrounds() {
  return (
    <PageLayout>
      <SectionContainer>
        <Container>
          <Row className="py-6">
            <Col>
              <h2>Section 1 - Auto Alternating (Should be Light)</h2>
              <p>This section should have a light background based on alternating order.</p>
            </Col>
          </Row>
        </Container>
      </SectionContainer>

      <SectionContainer>
        <Container>
          <Row className="py-6">
            <Col>
              <h2>Section 2 - Auto Alternating (Should be Dark)</h2>
              <p>This section should have a dark background based on alternating order.</p>
            </Col>
          </Row>
        </Container>
      </SectionContainer>

      <SectionContainer>
        <Container>
          <Row className="py-6">
            <Col>
              <h2>Section 3 - Auto Alternating (Should be Light)</h2>
              <p>This section should have a light background based on alternating order.</p>
            </Col>
          </Row>
        </Container>
      </SectionContainer>

      <SectionContainer backgroundVariant="dark">
        <Container>
          <Row className="py-6">
            <Col>
              <h2>Section 4 - Force Dark</h2>
              <p>This section has an explicitly set dark background via backgroundVariant="dark".</p>
            </Col>
          </Row>
        </Container>
      </SectionContainer>

      <SectionContainer backgroundVariant="light">
        <Container>
          <Row className="py-6">
            <Col>
              <h2>Section 5 - Force Light</h2>
              <p>This section has an explicitly set light background via backgroundVariant="light".</p>
            </Col>
          </Row>
        </Container>
      </SectionContainer>
    </PageLayout>
  );
} 