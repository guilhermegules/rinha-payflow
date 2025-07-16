CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  correlation_id UUID NOT NULL,
  amount NUMERIC NOT NULL,
  processor TEXT NOT NULL CHECK (processor IN ('default', 'fallback')),
  status TEXT NOT NULL CHECK (status IN ('success', 'failure')),
  requested_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX idx_requested_at ON payments(requested_at);
