
CREATE TABLE IF NOT EXISTS public.grocery_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    price DECIMAL(10, 2) NOT NULL,
    inventory_level INT NOT NULL
);


INSERT INTO public.grocery_items (name, price, inventory_level) VALUES
('Apple', 0.50, 100),
('Banana', 0.30, 150),
('Carrot', 0.20, 200)
ON CONFLICT (name) DO NOTHING; 

CREATE TABLE IF NOT EXISTS public.orders (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES public.orders(id),
    grocery_item_id INT NOT NULL REFERENCES public.grocery_items(id),
    quantity INT NOT NULL
);

INSERT INTO public.orders DEFAULT VALUES RETURNING id;

INSERT INTO public.order_items (order_id, grocery_item_id, quantity) VALUES
(1, 1, 10),
(1, 2, 15);
