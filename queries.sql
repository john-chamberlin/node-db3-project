-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
select p.productname, c.categoryname from product as p
join category as c
group by productname

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
select id, s.companyname, orderdate from 'order' as o
join shipper as s
    on o.shipvia = s.id
where (orderdate < '2012-08-09')
order by orderdate asc

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
select p.productname, od.quantity from orderdetail as od
join product as p
    on od.productid = p.id
where od.orderid = 10251

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
select
 id as 'Order ID',
 c.companyname as 'Company Name',
 e.lastname as 'Employee Last Name'
    from 'order' as o
join employee as e
    on e.id = o.employeeid
join customer as c
    on o.customerid = c.id