zadanie:
znalezienie maksymalnej liczby nakladajacych sie na siebie przedzialow czasu

przyklad  tablicy wej
<pre>
$in = [
'from' => 1234, 'to' => 1345,
'from' => 1234, 'to' => 1311,
'from' => 1, 'to' => 33
];
</pre>

W tym wypadku maksylana liczba nakladajacych sie czasow wynosi 1 (index 0 i 1).


wywolanie testow:
$phpunit OverlapCalculatorTest.php
