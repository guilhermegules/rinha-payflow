CREATE TABLE payments (
  id UUID PRIMARY KEY,
  correlation_id UUID NOT NULL,
  amount NUMERIC NOT NULL,
  processor TEXT NOT NULL,
  status TEXT NOT NULL,
  requested_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX idx_requested_at ON payments(requested_at);
