<div>Thank you for your order!</div><br />
<div>
  Order information <br />
  Full Name: {{ $orderInfo['firstname'] }} {{ $orderInfo['lastname'] }} <br />
  Phone: {{ $orderInfo['mobile'] }} <br />
  Address: {{ $orderInfo['country'] }} - {{ $orderInfo['city'] }} - {{ $orderInfo['address'] }} <br />
  Price: {{ $orderInfo['amount'] }} <br />
</div>
<table>
  <tr>
    <th>No.</th>
    <th>Image</th>
    <th>Gallery Name</th>
    <th>Quantity</th>
  </tr>
  @foreach ($listProduct as $key => $product)
    <tr>
      <td>{{ $key + 1 }}</td>
      <td>
        <img src="{{ $product->image }}" width="100" height="100" />
      </td>
      <td>{{ $product->title }}</td>
      <td>{{ $product->quantity }}</td>
    </tr>
  @endforeach
</table>
<br />
<br />
<br />
