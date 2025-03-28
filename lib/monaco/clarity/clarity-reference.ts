export const clarity = {
    functions: [
        {
            name: '+ (add)',
            input_type: 'int, ... | uint, ...',
            output_type: 'int | uint',
            signature: '(+ i1 i2...)',
            description:
                'Adds a variable number of integer inputs and returns the result. In the event of an _overflow_, throws a runtime error.',
            example: '(+ 1 2 3) ;; Returns 6',
        },
        {
            name: '- (subtract)',
            input_type: 'int, ... | uint, ...',
            output_type: 'int | uint',
            signature: '(- i1 i2...)',
            description:
                'Subtracts a variable number of integer inputs and returns the result. In the event of an _underflow_, throws a runtime error.',
            example: '(- 2 1 1) ;; Returns 0\n(- 0 3) ;; Returns -3\n',
        },
        {
            name: '* (multiply)',
            input_type: 'int, ... | uint, ...',
            output_type: 'int | uint',
            signature: '(* i1 i2...)',
            description:
                'Multiplies a variable number of integer inputs and returns the result. In the event of an _overflow_, throws a runtime error.',
            example: '(* 2 3) ;; Returns 6\n(* 5 2) ;; Returns 10\n(* 2 2 2) ;; Returns 8\n',
        },
        {
            name: '/ (divide)',
            input_type: 'int, ... | uint, ...',
            output_type: 'int | uint',
            signature: '(/ i1 i2...)',
            description:
                'Integer divides a variable number of integer inputs and returns the result. In the event of division by zero, throws a runtime error.',
            example: '(/ 2 3) ;; Returns 0\n(/ 5 2) ;; Returns 2\n(/ 4 2 2) ;; Returns 1\n',
        },
        {
            name: '>= (greater than or equal)',
            input_type: 'int, int | uint, uint',
            output_type: 'bool',
            signature: '(>= i1 i2)',
            description:
                'Compares two integers, returning `true` if `i1` is greater than or equal to `i2` and `false` otherwise.',
            example: '(>= 1 1) ;; Returns true\n(>= 5 2) ;; Returns true\n',
        },
        {
            name: '<= (less than or equal)',
            input_type: 'int, int | uint, uint',
            output_type: 'bool',
            signature: '(<= i1 i2)',
            description:
                'Compares two integers, returning true if `i1` is less than or equal to `i2` and `false` otherwise.',
            example: '(<= 1 1) ;; Returns true\n(<= 5 2) ;; Returns false\n',
        },
        {
            name: '< (less than)',
            input_type: 'int, int | uint, uint',
            output_type: 'bool',
            signature: '(< i1 i2)',
            description:
                'Compares two integers, returning `true` if `i1` is less than `i2` and `false` otherwise.',
            example: '(< 1 2) ;; Returns true\n(< 5 2) ;; Returns false\n',
        },
        {
            name: '> (greater than)',
            input_type: 'int, int | uint, uint',
            output_type: 'bool',
            signature: '(> i1 i2)',
            description:
                'Compares two integers, returning `true` if `i1` is greater than `i2` and false otherwise.',
            example: '(> 1 2) ;; Returns false\n(> 5 2) ;; Returns true\n',
        },
        {
            name: 'to-int',
            input_type: 'uint',
            output_type: 'int',
            signature: '(to-int u)',
            description:
                'Tries to convert the `uint` argument to an `int`. Will cause a runtime error and abort if the supplied argument is >= `pow(2, 127)`',
            example: '(to-int u238) ;; Returns 238',
        },
        {
            name: 'to-uint',
            input_type: 'int',
            output_type: 'uint',
            signature: '(to-uint i)',
            description:
                'Tries to convert the `int` argument to a `uint`. Will cause a runtime error and abort if the supplied argument is negative.',
            example: '(to-uint 238) ;; Returns u238',
        },
        {
            name: 'mod',
            input_type: 'int, int | uint, uint',
            output_type: 'int | uint',
            signature: '(mod i1 i2)',
            description:
                'Returns the integer remainder from integer dividing `i1` by `i2`. In the event of a division by zero, throws a runtime error.',
            example: '(mod 2 3) ;; Returns 2\n(mod 5 2) ;; Returns 1\n(mod 7 1) ;; Returns 0\n',
        },
        {
            name: 'pow',
            input_type: 'int, int | uint, uint',
            output_type: 'int | uint',
            signature: '(pow i1 i2)',
            description:
                'Returns the result of raising `i1` to the power of `i2`. In the event of an _overflow_, throws a runtime error.',
            example: '(pow 2 3) ;; Returns 8\n(pow 2 2) ;; Returns 4\n(pow 7 1) ;; Returns 7\n',
        },
        {
            name: 'sqrti',
            input_type: 'int | uint',
            output_type: 'int | uint',
            signature: '(sqrti n)',
            description:
                'Returns the largest integer that is less than or equal to the square root of `n`.  Fails on a negative numbers.',
            example:
                '(sqrti u11) ;; Returns u3\n(sqrti 1000000) ;; Returns 1000\n(sqrti u1) ;; Returns u1\n(sqrti 0) ;; Returns 0\n',
        },
        {
            name: 'log2',
            input_type: 'int | uint',
            output_type: 'int | uint',
            signature: '(log2 n)',
            description:
                'Returns the power to which the number 2 must be raised to to obtain the value `n`, rounded down to the nearest integer. Fails on a negative numbers.',
            example:
                '(log2 u8) ;; Returns u3\n(log2 8) ;; Returns 3\n(log2 u1) ;; Returns u0\n(log2 1000) ;; Returns 9\n',
        },
        {
            name: 'xor',
            input_type: 'int, int | uint, uint',
            output_type: 'int | uint',
            signature: '(xor i1 i2)',
            description: "Returns the result of bitwise exclusive or'ing `i1` with `i2`.",
            example: '(xor 1 2) ;; Returns 3\n(xor 120 280) ;; Returns 352\n',
        },
        {
            name: 'and',
            input_type: 'bool, ...',
            output_type: 'bool',
            signature: '(and b1 b2 ...)',
            description:
                'Returns `true` if all boolean inputs are `true`. Importantly, the supplied arguments are evaluated in-order and lazily. Lazy evaluation means that if one of the arguments returns `false`, the function short-circuits, and no subsequent arguments are evaluated.',
            example:
                '(and true false) ;; Returns false\n(and (is-eq (+ 1 2) 1) (is-eq 4 4)) ;; Returns false\n(and (is-eq (+ 1 2) 3) (is-eq 4 4)) ;; Returns true\n',
        },
        {
            name: 'or',
            input_type: 'bool, ...',
            output_type: 'bool',
            signature: '(or b1 b2 ...)',
            description:
                'Returns `true` if any boolean inputs are `true`. Importantly, the supplied arguments are evaluated in-order and lazily. Lazy evaluation means that if one of the arguments returns `false`, the function short-circuits, and no subsequent arguments are evaluated.',
            example:
                '(or true false) ;; Returns true\n(or (is-eq (+ 1 2) 1) (is-eq 4 4)) ;; Returns true\n(or (is-eq (+ 1 2) 1) (is-eq 3 4)) ;; Returns false\n(or (is-eq (+ 1 2) 3) (is-eq 4 4)) ;; Returns true\n',
        },
        {
            name: 'not',
            input_type: 'bool',
            output_type: 'bool',
            signature: '(not b1)',
            description: 'Returns the inverse of the boolean input.',
            example: '(not true) ;; Returns false\n(not (is-eq 1 2)) ;; Returns true\n',
        },
        {
            name: 'is-eq',
            input_type: 'A, A, ...',
            output_type: 'bool',
            signature: '(is-eq v1 v2...)',
            description:
                'Compares the inputted values, returning `true` if they are all equal. Note that \n_unlike_ the `(and ...)` function, `(is-eq ...)` will _not_ short-circuit. All values supplied to\nis-eq _must_ be the same type.',
            example:
                '(is-eq 1 1) ;; Returns true\n(is-eq true false) ;; Returns false\n(is-eq "abc" 234 234) ;; Throws type error\n',
        },
        {
            name: 'if',
            input_type: 'bool, A, A',
            output_type: 'A',
            signature: '(if bool1 expr1 expr2)',
            description:
                'The `if` function admits a boolean argument and two expressions\nwhich must return the same type. In the case that the boolean input is `true`, the\n`if` function evaluates and returns `expr1`. If the boolean input is `false`, the\n`if` function evaluates and returns `expr2`.',
            example: '(if true 1 2) ;; Returns 1\n(if (> 1 2) 1 2) ;; Returns 2',
        },
        {
            name: 'let',
            input_type: '((name2 AnyType) (name2 AnyType) ...), AnyType, ... A',
            output_type: 'A',
            signature: '(let ((name1 expr1) (name2 expr2) ...) expr-body1 expr-body2 ... expr-body-last)',
            description:
                'The `let` function accepts a list of `variable name` and `expression` pairs,\nevaluating each expression and _binding_ it to the corresponding variable name.\n`let` bindings are sequential: when a `let` binding is evaluated, it may refer to prior binding.\nThe _context_ created by this set of bindings is used for evaluating its body expressions.\n The let expression returns the value of the last such body expression.\nNote: intermediary statements returning a response type must be checked',
            example:
                '(let ((a 2) (b (+ 5 6 7))) (print a) (print b) (+ a b)) ;; Returns 20\n(let ((a 5) (c (+ a 1)) (d (+ c 1)) (b (+ a c d))) (print a) (print b) (+ a b)) ;; Returns 23',
        },
        {
            name: 'map',
            input_type:
                'Function(A, B, ..., N) -> X, (list A1 A2 ... Am), (list B1 B2 ... Bm), ..., (list N1 N2 ... Nm)',
            output_type: '(list X)',
            signature: '(map func list-A list-B ... list-N)',
            description:
                'The `map` function applies the input function `func` to each element of the\ninput lists, and outputs a list containing the _outputs_ from those function applications.',
            example:
                '\n(map not (list true false true false)) ;; Returns (false true false true)\n(map + (list 1 2 3) (list 1 2 3) (list 1 2 3)) ;; Returns (3 6 9)',
        },
        {
            name: 'fold',
            input_type: 'Function(A, B) -> B, (list A), B',
            output_type: 'B',
            signature: '(fold func list initial-value)',
            description:
                'The `fold` special form applies the input function `func` to each element of the\ninput list _and_ the output of the previous application of the `fold` function. When invoked on\nthe first list element, it uses the `initial-value` as the second input. `fold` returns the last\nvalue returned by the successive applications. Note that the first argument is not evaluated thus\nhas to be a literal function name.',
            example:
                '(fold * (list 2 2 2) 1) ;; Returns 8\n(fold * (list 2 2 2) 0) ;; Returns 0\n;; calculates (- 11 (- 7 (- 3 2)))\n(fold - (list 3 7 11) 2) ;; Returns 5 \n(fold concat "cdef" "ab")   ;; Returns "fedcab"\n(fold concat (list "cd" "ef") "ab")   ;; Returns "efcdab"',
        },
        {
            name: 'append',
            input_type: 'list A, A',
            output_type: 'list',
            signature: '(append (list 1 2 3 4) 5)',
            description:
                'The `append` function takes a list and another value with the same entry type,\nand outputs a list of the same type with max_len += 1.',
            example: '(append (list 1 2 3 4) 5) ;; Returns (1 2 3 4 5)',
        },
        {
            name: 'concat',
            input_type: '(buff, buff)|(list, list)',
            output_type: 'buff|list',
            signature: '(concat buff-a buff-b)',
            description:
                'The `concat` function takes two buffers or two lists with the same entry type,\nand returns a concatenated buffer or list of the same entry type, with max_len = max_len_a + max_len_b.',
            example: '(concat "hello " "world") ;; Returns "hello world"',
        },
        {
            name: 'as-max-len?',
            input_type: 'buff|list, uint',
            output_type: '(optional buff|list)',
            signature: '(as-max-len? buffer u10)',
            description:
                'The `as-max-len?` function takes a length N (must be a literal) and a buffer or list argument, which must be typed as a list\nor buffer of length M and outputs that same list or buffer, but typed with max length N.\n\nThis function returns an optional type with the resulting sequence. If the input sequence is less than\nor equal to the supplied max-len, it returns `(some <sequence>)`, otherwise it returns `none`.',
            example:
                '(as-max-len? (list 2 2 2) u3) ;; Returns (some (2 2 2))\n(as-max-len? (list 1 2 3) u2) ;; Returns none',
        },
        {
            name: 'len',
            input_type: 'buff|list',
            output_type: 'uint',
            signature: '(len buffer)',
            description: 'The `len` function returns the length of a given buffer or list.',
            example: '(len "blockstack") ;; Returns u10\n(len (list 1 2 3 4 5)) ;; Returns u5\n',
        },
        {
            name: 'element-at',
            input_type: 'buff|list A, uint',
            output_type: '(optional buff|A)',
            signature: '(element-at sequence index)',
            description:
                'The `element-at` function returns the element at `index` in the provided sequence.\nIf `index` is greater than or equal to `(len sequence)`, this function returns `none`.\nFor strings and buffers, this function will return 1-length strings or buffers.',
            example:
                '(element-at "blockstack" u5) ;; Returns (some "s")\n(element-at (list 1 2 3 4 5) u5) ;; Returns none\n(element-at (list 1 2 3 4 5) (+ u1 u2)) ;; Returns (some 4)\n(element-at "abcd" u1) ;; Returns (some "b")\n(element-at 0xfb01 u1) ;; Returns (some 0x01)\n',
        },
        {
            name: 'index-of',
            input_type: 'buff|list A, buff|A',
            output_type: '(optional uint)',
            signature: '(index-of sequence item)',
            description:
                'The `index-of` function returns the first index at which `item` can be\nfound in the provided sequence (using `is-eq` checks).\n\nIf this item is not found in the sequence (or an empty string/buffer is supplied), this\nfunction returns `none`.',
            example:
                '(index-of "blockstack" "b") ;; Returns (some u0)\n(index-of "blockstack" "k") ;; Returns (some u4)\n(index-of "blockstack" "") ;; Returns none\n(index-of (list 1 2 3 4 5) 6) ;; Returns none\n(index-of 0xfb01 0x01) ;; Returns (some u1)\n',
        },
        {
            name: 'list',
            input_type: 'A, ...',
            output_type: '(list A)',
            signature: '(list expr1 expr2 expr3 ...)',
            description:
                'The `list` function constructs a list composed of the inputted values. Each\nsupplied value must be of the same type.',
            example: '(list (+ 1 2) 4 5) ;; Returns (3 4 5)',
        },
        {
            name: 'var-get',
            input_type: 'VarName',
            output_type: 'A',
            signature: '(var-get var-name)',
            description:
                "The `var-get` function looks up and returns an entry from a contract's data map.\nThe value is looked up using `var-name`.",
            example: '(define-data-var cursor int 6)\n(var-get cursor) ;; Returns 6',
        },
        {
            name: 'var-set',
            input_type: 'VarName, AnyType',
            output_type: 'bool',
            signature: '(var-set var-name expr1)',
            description:
                'The `var-set` function sets the value associated with the input variable to the\ninputted value.',
            example:
                '\n(define-data-var cursor int 6)\n(var-get cursor) ;; Returns 6\n(var-set cursor (+ (var-get cursor) 1)) ;; Returns true\n(var-get cursor) ;; Returns 7',
        },
        {
            name: 'map-get?',
            input_type: 'MapName, tuple',
            output_type: '(optional (tuple))',
            signature: '(map-get? map-name key-tuple)',
            description:
                "The `map-get?` function looks up and returns an entry from a contract's data map.\nThe value is looked up using `key-tuple`.\nIf there is no value associated with that key in the data map, the function returns a `none` option. Otherwise,\nit returns `(some value)`.",
            example:
                '(define-map names-map { name: (string-ascii 10) } { id: int })\n(map-set names-map { name: "blockstack" } { id: 1337 })\n(map-get? names-map (tuple (name "blockstack"))) ;; Returns (some (tuple (id 1337)))\n(map-get? names-map { name: "blockstack" }) ;; Same command, using a shorthand for constructing the tuple\n',
        },
        {
            name: 'map-set',
            input_type: 'MapName, tuple_A, tuple_B',
            output_type: 'bool',
            signature: '(map-set map-name key-tuple value-tuple)',
            description:
                'The `map-set` function sets the value associated with the input key to the\ninputted value. This function performs a _blind_ update; whether or not a value is already associated\nwith the key, the function overwrites that existing association.\n\nNote: the `value-tuple` requires 1 additional byte for storage in the materialized blockchain state,\nand therefore the maximum size of a value that may be inserted into a map is MAX_CLARITY_VALUE - 1.',
            example:
                '(define-map names-map { name: (string-ascii 10) } { id: int })\n(map-set names-map { name: "blockstack" } { id: 1337 }) ;; Returns true\n(map-set names-map (tuple (name "blockstack")) (tuple (id 1337))) ;; Same command, using a shorthand for constructing the tuple\n',
        },
        {
            name: 'map-insert',
            input_type: 'MapName, tuple_A, tuple_B',
            output_type: 'bool',
            signature: '(map-insert map-name key-tuple value-tuple)',
            description:
                'The `map-insert` function sets the value associated with the input key to the\ninputted value if and only if there is not already a value associated with the key in the map.\nIf an insert occurs, the function returns `true`. If a value already existed for\nthis key in the data map, the function returns `false`.\n\nNote: the `value-tuple` requires 1 additional byte for storage in the materialized blockchain state,\nand therefore the maximum size of a value that may be inserted into a map is MAX_CLARITY_VALUE - 1.',
            example:
                '(define-map names-map { name: (string-ascii 10) } { id: int })\n(map-insert names-map { name: "blockstack" } { id: 1337 }) ;; Returns true\n(map-insert names-map { name: "blockstack" } { id: 1337 }) ;; Returns false\n(map-insert names-map (tuple (name "blockstack")) (tuple (id 1337))) ;; Same command, using a shorthand for constructing the tuple\n',
        },
        {
            name: 'map-delete',
            input_type: 'MapName, tuple',
            output_type: 'bool',
            signature: '(map-delete map-name key-tuple)',
            description:
                'The `map-delete` function removes the value associated with the input key for\nthe given map. If an item exists and is removed, the function returns `true`.\nIf a value did not exist for this key in the data map, the function returns `false`.',
            example:
                '(define-map names-map { name: (string-ascii 10) } { id: int })\n(map-insert names-map { name: "blockstack" } { id: 1337 }) ;; Returns true\n(map-delete names-map { name: "blockstack" }) ;; Returns true\n(map-delete names-map { name: "blockstack" }) ;; Returns false\n(map-delete names-map (tuple (name "blockstack"))) ;; Same command, using a shorthand for constructing the tuple\n',
        },
        {
            name: 'tuple',
            input_type: '(key-name A), (key-name-2 B), ...',
            output_type: '(tuple (key-name A) (key-name-2 B) ...)',
            signature: '(tuple (key0 expr0) (key1 expr1) ...)',
            description:
                "The `tuple` special form constructs a typed tuple from the supplied key and expression pairs.\nA `get` function can use typed tuples as input to select specific values from a given tuple.\nKey names may not appear multiple times in the same tuple definition. Supplied expressions are evaluated and\nassociated with the expressions' paired key name.\n\nThere is a shorthand using curly brackets of the form {key0: expr0, key1: expr, ...}",
            example:
                '(tuple (name "blockstack") (id 1337)) ;; using tuple\n    {name: "blockstack", id: 1337} ;; using curly brackets',
        },
        {
            name: 'get',
            input_type: 'KeyName, (tuple) | (optional (tuple))',
            output_type: 'A',
            signature: '(get key-name tuple)',
            description:
                'The `get` function fetches the value associated with a given key from the supplied typed tuple.\nIf an `Optional` value is supplied as the inputted tuple, `get` returns an `Optional` type of the specified key in\nthe tuple. If the supplied option is a `(none)` option, get returns `(none)`.',
            example:
                '(define-map names-map { name: (string-ascii 12) } { id: int })\n(map-insert names-map { name: "blockstack" } { id: 1337 }) ;; Returns true\n(get id (tuple (name "blockstack") (id 1337))) ;; Returns 1337\n(get id (map-get? names-map (tuple (name "blockstack")))) ;; Returns (some 1337)\n(get id (map-get? names-map (tuple (name "non-existent")))) ;; Returns none\n',
        },
        {
            name: 'merge',
            input_type: 'tuple, tuple',
            output_type: 'tuple',
            signature: '(merge tuple { key1: val1 })',
            description:
                'The `merge` function returns a new tuple with the combined fields, without mutating the supplied tuples.',
            example:
                '(define-map users { id: int } { name: (string-ascii 12), address: (optional principal) })\n(map-insert users { id: 1337 } { name: "john", address: none }) ;; Returns true\n(let ((user (unwrap-panic (map-get? users { id: 1337 }))))\n    (merge user { address: (some \'SPAXYA5XS51713FDTQ8H94EJ4V579CXMTRNBZKSF) })) ;; Returns (tuple (address (some SPAXYA5XS51713FDTQ8H94EJ4V579CXMTRNBZKSF)) (name "john"))',
        },
        {
            name: 'begin',
            input_type: 'AnyType, ... A',
            output_type: 'A',
            signature: '(begin expr1 expr2 expr3 ... expr-last)',
            description:
                'The `begin` function evaluates each of its input expressions, returning the\nreturn value of the last such expression.\nNote: intermediary statements returning a response type must be checked.',
            example: '(begin (+ 1 2) 4 5) ;; Returns 5',
        },
        {
            name: 'hash160',
            input_type: 'buff|uint|int',
            output_type: '(buff 20)',
            signature: '(hash160 value)',
            description:
                'The `hash160` function computes `RIPEMD160(SHA256(x))` of the inputted value.\nIf an integer (128 bit) is supplied the hash is computed over the little-endian representation of the\ninteger.',
            example: '(hash160 0) ;; Returns 0xe4352f72356db555721651aa612e00379167b30f',
        },
        {
            name: 'sha256',
            input_type: 'buff|uint|int',
            output_type: '(buff 32)',
            signature: '(sha256 value)',
            description:
                'The `sha256` function computes `SHA256(x)` of the inputted value.\nIf an integer (128 bit) is supplied the hash is computed over the little-endian representation of the\ninteger.',
            example:
                '(sha256 0) ;; Returns 0x374708fff7719dd5979ec875d56cd2286f6d3cf7ec317a3b25632aab28ec37bb',
        },
        {
            name: 'sha512',
            input_type: 'buff|uint|int',
            output_type: '(buff 64)',
            signature: '(sha512 value)',
            description:
                'The `sha512` function computes `SHA512(x)` of the inputted value.\nIf an integer (128 bit) is supplied the hash is computed over the little-endian representation of the\ninteger.',
            example:
                '(sha512 1) ;; Returns 0x6fcee9a7b7a7b821d241c03c82377928bc6882e7a08c78a4221199bfa220cdc55212273018ee613317c8293bb8d1ce08d1e017508e94e06ab85a734c99c7cc34',
        },
        {
            name: 'sha512/256',
            input_type: 'buff|uint|int',
            output_type: '(buff 32)',
            signature: '(sha512/256 value)',
            description:
                'The `sha512/256` function computes `SHA512/256(x)` (the SHA512 algorithm with the 512/256 initialization vector, truncated\nto 256 bits) of the inputted value.\nIf an integer (128 bit) is supplied the hash is computed over the little-endian representation of the\ninteger.',
            example:
                '(sha512/256 1) ;; Returns 0x515a7e92e7c60522db968d81ff70b80818fc17aeabbec36baf0dda2812e94a86',
        },
        {
            name: 'keccak256',
            input_type: 'buff|uint|int',
            output_type: '(buff 32)',
            signature: '(keccak256 value)',
            description:
                'The `keccak256` function computes `KECCAK256(value)` of the inputted value.\nNote that this differs from the `NIST SHA-3` (that is, FIPS 202) standard. If an integer (128 bit)\nis supplied the hash is computed over the little-endian representation of the integer.',
            example:
                '(keccak256 0) ;; Returns 0xf490de2920c8a35fabeb13208852aa28c76f9be9b03a4dd2b3c075f7a26923b4',
        },
        {
            name: 'secp256k1-recover?',
            input_type: '(buff 32), (buff 65)',
            output_type: '(response (buff 33) uint)',
            signature: '(secp256k1-recover? message-hash signature)',
            description:
                'The `secp256k1-recover?` function recovers the public key used to sign the message  which sha256 is `message-hash`\n    with the provided `signature`.\n    If the signature does not match, it will return the error code `(err u1).`.\n    If the signature is invalid, it will return the error code `(err u2).`.\n    The signature includes 64 bytes plus an additional recovery id (00..03) for a total of 65 bytes.',
            example:
                '(secp256k1-recover? 0xde5b9eb9e7c5592930eb2e30a01369c36586d872082ed8181ee83d2a0ec20f04\n 0x8738487ebe69b93d8e51583be8eee50bb4213fc49c767d329632730cc193b873554428fc936ca3569afc15f1c9365f6591d6251a89fee9c9ac661116824d3a1301)\n ;; Returns (ok 0x03adb8de4bfb65db2cfd6120d55c6526ae9c52e675db7e47308636534ba7786110)',
        },
        {
            name: 'secp256k1-verify',
            input_type: '(buff 32), (buff 64) | (buff 65), (buff 33)',
            output_type: 'bool',
            signature: '(secp256k1-verify message-hash signature public-key)',
            description:
                'The `secp256k1-verify` function verifies that the provided signature of the message-hash\nwas signed with the private key that generated the public key.\nThe `message-hash` is the `sha256` of the message.\nThe signature includes 64 bytes plus an optional additional recovery id (00..03) for a total of 64 or 65 bytes.',
            example:
                '(secp256k1-verify 0xde5b9eb9e7c5592930eb2e30a01369c36586d872082ed8181ee83d2a0ec20f04\n 0x8738487ebe69b93d8e51583be8eee50bb4213fc49c767d329632730cc193b873554428fc936ca3569afc15f1c9365f6591d6251a89fee9c9ac661116824d3a1301\n 0x03adb8de4bfb65db2cfd6120d55c6526ae9c52e675db7e47308636534ba7786110) ;; Returns true\n(secp256k1-verify 0xde5b9eb9e7c5592930eb2e30a01369c36586d872082ed8181ee83d2a0ec20f04\n 0x8738487ebe69b93d8e51583be8eee50bb4213fc49c767d329632730cc193b873554428fc936ca3569afc15f1c9365f6591d6251a89fee9c9ac661116824d3a13\n 0x03adb8de4bfb65db2cfd6120d55c6526ae9c52e675db7e47308636534ba7786110) ;; Returns true\n(secp256k1-verify 0x0000000000000000000000000000000000000000000000000000000000000000\n 0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000\n 0x03adb8de4bfb65db2cfd6120d55c6526ae9c52e675db7e47308636534ba7786110) ;; Returns false',
        },
        {
            name: 'print',
            input_type: 'A',
            output_type: 'A',
            signature: '(print expr)',
            description:
                'The `print` function evaluates and returns its input expression. On Stacks Core\nnodes configured for development (as opposed to production mining nodes), this function prints the resulting value to `STDOUT` (standard output).',
            example: '(print (+ 1 2 3)) ;; Returns 6',
        },
        {
            name: 'contract-call?',
            input_type: 'ContractName, PublicFunctionName, Arg0, ...',
            output_type: '(response A B)',
            signature: '(contract-call? .contract-name function-name arg0 arg1 ...)',
            description:
                'The `contract-call?` function executes the given public function of the given contract.\nYou _may not_ use this function to call a public function defined in the current contract. If the public\nfunction returns _err_, any database changes resulting from calling `contract-call?` are aborted.\nIf the function returns _ok_, database changes occurred.',
            example:
                '\n;; instantiate the sample-contracts/tokens.clar contract first!\n(as-contract (contract-call? .tokens mint! u19)) ;; Returns (ok u19)',
        },
        {
            name: 'as-contract',
            input_type: 'A',
            output_type: 'A',
            signature: '(as-contract expr)',
            description:
                "The `as-contract` function switches the current context's `tx-sender` value to the _contract's_\nprincipal and executes `expr` with that context. It returns the resulting value of `expr`.",
            example:
                '(as-contract tx-sender) ;; Returns S1G2081040G2081040G2081040G208105NK8PE5.docs-test',
        },
        {
            name: 'contract-of',
            input_type: 'Trait',
            output_type: 'principal',
            signature: '(contract-of .contract-name)',
            description:
                'The `contract-of` function returns the principal of the contract implementing the trait.',
            example:
                "\n(use-trait token-a-trait 'SPAXYA5XS51713FDTQ8H94EJ4V579CXMTRNBZKSF.token-a.token-trait)\n(define-public (forward-get-balance (user principal) (contract <token-a-trait>))\n  (begin\n    (ok (contract-of contract)))) ;; returns the principal of the contract implementing <token-a-trait>\n",
        },
        {
            name: 'principal-of?',
            input_type: '(buff 33)',
            output_type: '(response principal uint)',
            signature: '(principal-of? public-key)',
            description:
                'The `principal-of?` function returns the principal derived from the provided public key.\n    If the `public-key` is invalid, it will return the error code `(err u1).`.\n    ',
            example:
                '(principal-of? 0x03adb8de4bfb65db2cfd6120d55c6526ae9c52e675db7e47308636534ba7786110) ;; Returns (ok ST1AW6EKPGT61SQ9FNVDS17RKNWT8ZP582VF9HSCP)',
        },
        {
            name: 'at-block',
            input_type: '(buff 32), A',
            output_type: 'A',
            signature: '(at-block id-block-hash expr)',
            description:
                'The `at-block` function evaluates the expression `expr` _as if_ it were evaluated at the end of the\nblock indicated by the _block-hash_ argument. The `expr` closure must be read-only.\n\nNote: The block identifying hash must be a hash returned by the `id-header-hash` block information\nproperty. This hash uniquely identifies Stacks blocks and is unique across Stacks forks. While the hash returned by\n`header-hash` is unique within the context of a single fork, it is not unique across Stacks forks.\n\nThe function returns the result of evaluating `expr`.\n',
            example:
                "\n(define-data-var data int 1)\n(at-block 0x0000000000000000000000000000000000000000000000000000000000000000 block-height) ;; Returns u0\n(at-block (get-block-info? id-header-hash 0) (var-get data)) ;; Throws NoSuchDataVariable because `data` wasn't initialized at block height 0",
        },
        {
            name: 'get-block-info?',
            input_type: 'BlockInfoPropertyName, BlockHeightInt',
            output_type: '(optional buff) | (optional uint)',
            signature: '(get-block-info? prop-name block-height-expr)',
            description:
                'The `get-block-info?` function fetches data for a block of the given block height. The\nvalue and type returned are determined by the specified `BlockInfoPropertyName`. If the provided `BlockHeightInt` does\nnot correspond to an existing block prior to the current block, the function returns `none`. The currently available property names\nare `time`, `header-hash`, `burnchain-header-hash`, `id-header-hash`, `miner-address`, and `vrf-seed`.\n\nThe `time` property returns an integer value of the block header time field. This is a Unix epoch timestamp in seconds\nwhich roughly corresponds to when the block was mined. **Warning**: this does not increase monotonically with each block\nand block times are accurate only to within two hours. See [BIP113](https://github.com/bitcoin/bips/blob/master/bip-0113.mediawiki) for more information.\n\nThe `header-hash`, `burnchain-header-hash`, `id-header-hash`, and `vrf-seed` properties return a 32-byte buffer.\n\nThe `miner-address` property returns a `principal` corresponding to the miner of the given block.\n\nThe `id-header-hash` is the block identifier value that must be used as input to the `at-block` function.\n',
            example:
                '(get-block-info? time u0) ;; Returns (some u1557860301)\n(get-block-info? header-hash u0) ;; Returns (some 0x374708fff7719dd5979ec875d56cd2286f6d3cf7ec317a3b25632aab28ec37bb)\n(get-block-info? vrf-seed u0) ;; Returns (some 0xf490de2920c8a35fabeb13208852aa28c76f9be9b03a4dd2b3c075f7a26923b4)\n',
        },
        {
            name: 'err',
            input_type: 'A',
            output_type: '(response A B)',
            signature: '(err value)',
            description:
                'The `err` function constructs a response type from the input value. Use `err` for\ncreating return values in public functions. An _err_ value indicates that any database changes during\nthe processing of the function should be rolled back.',
            example: '(err true) ;; Returns (err true)',
        },
        {
            name: 'ok',
            input_type: 'A',
            output_type: '(response A B)',
            signature: '(ok value)',
            description:
                'The `ok` function constructs a response type from the input value. Use `ok` for\ncreating return values in public functions. An _ok_ value indicates that any database changes during\nthe processing of the function should materialize.',
            example: '(ok 1) ;; Returns (ok 1)',
        },
        {
            name: 'some',
            input_type: 'A',
            output_type: '(optional A)',
            signature: '(some value)',
            description: 'The `some` function constructs a `optional` type from the input value.',
            example: '(some 1) ;; Returns (some 1)\n(is-none (some 2)) ;; Returns false',
        },
        {
            name: 'default-to',
            input_type: 'A, (optional A)',
            output_type: 'A',
            signature: '(default-to default-value option-value)',
            description:
                "The `default-to` function attempts to 'unpack' the second argument: if the argument is\na `(some ...)` option, it returns the inner value of the option. If the second argument is a `(none)` value,\n`default-to` it returns the value of `default-value`.",
            example:
                '\n(define-map names-map { name: (string-ascii 12) } { id: int })\n(map-set names-map { name: "blockstack" } { id: 1337 })\n(default-to 0 (get id (map-get? names-map (tuple (name "blockstack"))))) ;; Returns 1337\n(default-to 0 (get id (map-get? names-map (tuple (name "non-existant"))))) ;; Returns 0\n',
        },
        {
            name: 'asserts!',
            input_type: 'bool, C',
            output_type: 'bool',
            signature: '(asserts! bool-expr thrown-value)',
            description:
                'The `asserts!` function admits a boolean argument and asserts its evaluation:\nif bool-expr is `true`, `asserts!` returns `true` and proceeds in the program execution.\nIf the supplied argument is returning a false value, `asserts!` _returns_ `thrown-value` and exits the current\ncontrol-flow.',
            example: '(asserts! (is-eq 1 1) (err 1)) ;; Returns true',
        },
        {
            name: 'unwrap!',
            input_type: '(optional A) | (response A B), C',
            output_type: 'A',
            signature: '(unwrap! option-input thrown-value)',
            description:
                "The `unwrap!` function attempts to 'unpack' the first argument: if the argument is\nan option type, and the argument is a `(some ...)` option, `unwrap!` returns the inner value of the\noption. If the argument is a response type, and the argument is an `(ok ...)` response, `unwrap!` returns\n the inner value of the `ok`. If the supplied argument is either an `(err ...)` or a `(none)` value,\n`unwrap!` _returns_ `thrown-value` from the current function and exits the current control-flow.",
            example:
                '\n(define-map names-map { name: (string-ascii 12) } { id: int })\n(map-set names-map { name: "blockstack" } { id: 1337 })\n(define-private (get-name-or-err (name (string-ascii 12)))\n  (let ((raw-name (unwrap! (map-get? names-map { name: name }) (err 1))))\n       (ok raw-name)))\n\n(get-name-or-err "blockstack") ;; Returns (ok (tuple (id 1337)))\n(get-name-or-err "non-existant") ;; Returns (err 1)',
        },
        {
            name: 'unwrap-err!',
            input_type: '(response A B), C',
            output_type: 'B',
            signature: '(unwrap-err! response-input thrown-value)',
            description:
                "The `unwrap-err!` function attempts to 'unpack' the first argument: if the argument\nis an `(err ...)` response, `unwrap-err!` returns the inner value of the `err`.\nIf the supplied argument is an `(ok ...)` value,\n`unwrap-err!` _returns_ `thrown-value` from the current function and exits the current control-flow.",
            example: '(unwrap-err! (err 1) false) ;; Returns 1',
        },
        {
            name: 'unwrap-panic',
            input_type: '(optional A) | (response A B)',
            output_type: 'A',
            signature: '(unwrap-panic option-input)',
            description:
                "The `unwrap` function attempts to 'unpack' its argument: if the argument is\nan option type, and the argument is a `(some ...)` option, this function returns the inner value of the\noption. If the argument is a response type, and the argument is an `(ok ...)` response, it returns\n the inner value of the `ok`. If the supplied argument is either an `(err ...)` or a `(none)` value,\n`unwrap` throws a runtime error, aborting any further processing of the current transaction.",
            example:
                '\n(define-map names-map { name: (string-ascii 12) } { id: int })\n(map-set names-map { name: "blockstack" } { id: 1337 })\n(unwrap-panic (map-get? names-map { name: "blockstack" })) ;; Returns (tuple (id 1337))\n(unwrap-panic (map-get? names-map { name: "non-existant" })) ;; Throws a runtime exception\n',
        },
        {
            name: 'unwrap-err-panic',
            input_type: '(response A B)',
            output_type: 'B',
            signature: '(unwrap-err-panic response-input)',
            description:
                "The `unwrap-err` function attempts to 'unpack' the first argument: if the argument\nis an `(err ...)` response, `unwrap` returns the inner value of the `err`.\nIf the supplied argument is an `(ok ...)` value,\n`unwrap-err` throws a runtime error, aborting any further processing of the current transaction.",
            example:
                '(unwrap-err-panic (err 1)) ;; Returns 1\n(unwrap-err-panic (ok 1)) ;; Throws a runtime exception',
        },
        {
            name: 'match',
            input_type:
                '(optional A) name expression expression | (response A B) name expression name expression',
            output_type: 'C',
            signature:
                '(match opt-input some-binding-name some-branch none-branch) |\n(match-resp input ok-binding-name ok-branch err-binding-name err-branch)',
            description:
                'The `match` function is used to test and destructure optional and response types.\n\nIf the `input` is an optional, it tests whether the provided\n`input` is a `some` or `none` option, and evaluates `some-branch` or\n`none-branch` in each respective case.\n\nWithin the `some-branch`, the _contained value_ of the `input`\nargument is bound to the provided `some-binding-name` name.\n\nOnly _one_ of the branches will be evaluated (similar to `if` statements).\n\nIf the `input` is a response, it tests whether the provided `input` is\nan `ok` or `err` response type, and evaluates `ok-branch` or\n`err-branch` in each respective case.\n\nWithin the `ok-branch`, the _contained ok value_ of the `input`\nargument is bound to the provided `ok-binding-name` name.\n\nWithin the `err-branch`, the _contained err value_ of the `input`\nargument is bound to the provided `err-binding-name` name.\n\nOnly _one_ of the branches will be evaluated (similar to `if` statements).\n\nNote: Type checking requires that the type of both the ok and err parts of the\nresponse object be determinable. For situations in which one of the parts of a response\nis untyped, you should use `unwrap-panic` or `unwrap-err-panic` instead of `match`.',
            example:
                '\n(define-private (add-10 (x (optional int)))\n  (match x\n  value (+ 10 value)\n  10))\n(add-10 (some 5)) ;; Returns 15\n(add-10 none) ;; Returns 10\n\n(define-private (add-or-pass-err (x (response int (string-ascii 10))) (to-add int))\n  (match x\n   value (+ to-add value)\n   err-value (err err-value)))\n(add-or-pass-err (ok 5) 20) ;; Returns 25\n(add-or-pass-err (err "ERROR") 20) ;; Returns (err "ERROR")\n',
        },
        {
            name: 'try!',
            input_type: '(optional A) | (response A B)',
            output_type: 'A',
            signature: '(try! option-input)',
            description:
                "The `try!` function attempts to 'unpack' the first argument: if the argument is\nan option type, and the argument is a `(some ...)` option, `try!` returns the inner value of the\noption. If the argument is a response type, and the argument is an `(ok ...)` response, `try!` returns\n the inner value of the `ok`. If the supplied argument is either an `(err ...)` or a `none` value,\n`try!` _returns_ either `none` or the `(err ...)` value from the current function and exits the current control-flow.",
            example:
                '\n(define-map names-map { name: (string-ascii 12) } { id: int })\n(map-set names-map { name: "blockstack" } { id: 1337 })\n(try! (map-get? names-map { name: "blockstack" })) ;; Returns (tuple (id 1337))\n(define-private (checked-even (x int))\n  (if (is-eq (mod x 2) 0)\n      (ok x)\n      (err false)))\n(define-private (double-if-even (x int))\n  (ok (* 2 (try! (checked-even x)))))\n(double-if-even 10) ;; Returns (ok 20)\n(double-if-even 3) ;; Returns (err false)\n',
        },
        {
            name: 'is-ok',
            input_type: '(response A B)',
            output_type: 'bool',
            signature: '(is-ok value)',
            description:
                '`is-ok` tests a supplied response value, returning `true` if the response was `ok`,\nand `false` if it was an `err`.',
            example: '(is-ok (ok 1)) ;; Returns true\n(is-ok (err 1)) ;; Returns false',
        },
        {
            name: 'is-none',
            input_type: '(optional A)',
            output_type: 'bool',
            signature: '(is-none value)',
            description:
                '`is-none` tests a supplied option value, returning `true` if the option value is `(none)`,\nand `false` if it is a `(some ...)`.',
            example:
                '\n(define-map names-map { name: (string-ascii 12) } { id: int })\n(map-set names-map { name: "blockstack" } { id: 1337 })\n(is-none (get id (map-get? names-map { name: "blockstack" }))) ;; Returns false\n(is-none (get id (map-get? names-map { name: "non-existant" }))) ;; Returns true',
        },
        {
            name: 'is-err',
            input_type: '(response A B)',
            output_type: 'bool',
            signature: '(is-err value)',
            description:
                '`is-err` tests a supplied response value, returning `true` if the response was an `err`,\nand `false` if it was an `ok`.',
            example: '(is-err (ok 1)) ;; Returns false\n(is-err (err 1)) ;; Returns true',
        },
        {
            name: 'is-some',
            input_type: '(optional A)',
            output_type: 'bool',
            signature: '(is-some value)',
            description:
                '`is-some` tests a supplied option value, returning `true` if the option value is `(some ...)`,\nand `false` if it is a `none`.',
            example:
                '\n(define-map names-map { name: (string-ascii 12) } { id: int })\n(map-set names-map { name: "blockstack" } { id: 1337 })\n(is-some (get id (map-get? names-map { name: "blockstack" }))) ;; Returns true\n(is-some (get id (map-get? names-map { name: "non-existant" }))) ;; Returns false',
        },
        {
            name: 'filter',
            input_type: 'Function(A) -> bool, (list A)',
            output_type: '(list A)',
            signature: '(filter func list)',
            description:
                'The `filter` function applies the input function `func` to each element of the\ninput list, and returns the same list with any elements removed for which the `func` returned `false`.',
            example: '(filter not (list true false true false)) ;; Returns (false false)',
        },
        {
            name: 'ft-get-balance',
            input_type: 'TokenName, principal',
            output_type: 'uint',
            signature: '(ft-get-balance token-name principal)',
            description:
                '`ft-get-balance` returns `token-name` balance of the principal `principal`.\nThe token type must have been defined using `define-fungible-token`.',
            example:
                "\n(define-fungible-token stackaroo)\n(ft-mint? stackaroo u100 'SZ2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR)\n(ft-get-balance stackaroo 'SZ2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR) ;; Returns u100\n",
        },
        {
            name: 'nft-get-owner?',
            input_type: 'AssetName, A',
            output_type: '(optional principal)',
            signature: '(nft-get-owner? asset-class asset-identifier)',
            description:
                '`nft-get-owner?` returns the owner of an asset, identified by `asset-identifier`, or `none` if the asset does not exist.\nThe asset type must have been defined using `define-non-fungible-token`, and the supplied `asset-identifier` must be of the same type specified in\nthat definition.',
            example:
                '\n(define-non-fungible-token stackaroo (string-ascii 40))\n(nft-mint? stackaroo "Roo" \'SPAXYA5XS51713FDTQ8H94EJ4V579CXMTRNBZKSF)\n(nft-get-owner? stackaroo "Roo") ;; Returns (some SPAXYA5XS51713FDTQ8H94EJ4V579CXMTRNBZKSF)\n(nft-get-owner? stackaroo "Too") ;; Returns none\n',
        },
        {
            name: 'ft-transfer?',
            input_type: 'TokenName, uint, principal, principal',
            output_type: '(response bool uint)',
            signature: '(ft-transfer? token-name amount sender recipient)',
            description:
                '`ft-transfer?` is used to increase the token balance for the `recipient` principal for a token\ntype defined using `define-fungible-token` by debiting the `sender` principal.\n\nThis function returns (ok true) if the transfer is successful. In the event of an unsuccessful transfer it returns\none of the following error codes:\n\n`(err u1)` -- `sender` does not have enough balance to transfer\n`(err u2)` -- `sender` and `recipient` are the same principal\n`(err u3)` -- amount to send is non-positive\n',
            example:
                "\n(define-fungible-token stackaroo)\n(ft-mint? stackaroo u100 'SZ2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR)\n(ft-transfer? stackaroo u50 'SZ2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR 'SPAXYA5XS51713FDTQ8H94EJ4V579CXMTRNBZKSF) ;; Returns (ok true)\n(ft-transfer? stackaroo u60 'SZ2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR 'SPAXYA5XS51713FDTQ8H94EJ4V579CXMTRNBZKSF) ;; Returns (err u1)\n",
        },
        {
            name: 'nft-transfer?',
            input_type: 'AssetName, A, principal, principal',
            output_type: '(response bool uint)',
            signature: '(nft-transfer? asset-class asset-identifier sender recipient)',
            description:
                '`nft-transfer?` is used to change the owner of an asset identified by `asset-identifier`\nfrom `sender` to `recipient`. The `asset-class` must have been defined by `define-non-fungible-token` and `asset-identifier`\nmust be of the type specified in that definition.\n\nThis function returns (ok true) if the transfer is successful. In the event of an unsuccessful transfer it returns\none of the following error codes:\n\n`(err u1)` -- `sender` does not own the asset\n`(err u2)` -- `sender` and `recipient` are the same principal\n`(err u3)` -- asset identified by asset-identifier does not exist\n',
            example:
                '\n(define-non-fungible-token stackaroo (string-ascii 40))\n(nft-mint? stackaroo "Roo" \'SZ2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR)\n(nft-transfer? stackaroo "Roo" \'SZ2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR \'SPAXYA5XS51713FDTQ8H94EJ4V579CXMTRNBZKSF) ;; Returns (ok true)\n(nft-transfer? stackaroo "Roo" \'SZ2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR \'SPAXYA5XS51713FDTQ8H94EJ4V579CXMTRNBZKSF) ;; Returns (err u1)\n(nft-transfer? stackaroo "Stacka" \'SZ2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR \'SPAXYA5XS51713FDTQ8H94EJ4V579CXMTRNBZKSF) ;; Returns (err u3)\n',
        },
        {
            name: 'nft-mint?',
            input_type: 'AssetName, A, principal',
            output_type: '(response bool uint)',
            signature: '(nft-mint? asset-class asset-identifier recipient)',
            description:
                "`nft-mint?` is used to instantiate an asset and set that asset's owner to the `recipient` principal.\nThe asset must have been defined using `define-non-fungible-token`, and the supplied `asset-identifier` must be of the same type specified in\nthat definition.\n\nIf an asset identified by `asset-identifier` _already exists_, this function will return an error with the following error code:\n\n`(err u1)`\n\nOtherwise, on successfuly mint, it returns `(ok true)`.\n",
            example:
                '\n(define-non-fungible-token stackaroo (string-ascii 40))\n(nft-mint? stackaroo "Roo" \'SPAXYA5XS51713FDTQ8H94EJ4V579CXMTRNBZKSF) ;; Returns (ok true)\n',
        },
        {
            name: 'ft-mint?',
            input_type: 'TokenName, uint, principal',
            output_type: '(response bool uint)',
            signature: '(ft-mint? token-name amount recipient)',
            description:
                '`ft-mint?` is used to increase the token balance for the `recipient` principal for a token\ntype defined using `define-fungible-token`. The increased token balance is _not_ transfered from another principal, but\nrather minted.  \n\nIf a non-positive amount is provided to mint, this function returns `(err 1)`. Otherwise, on successfuly mint, it\nreturns `(ok true)`.\n',
            example:
                "\n(define-fungible-token stackaroo)\n(ft-mint? stackaroo u100 'SPAXYA5XS51713FDTQ8H94EJ4V579CXMTRNBZKSF) ;; Returns (ok true)\n",
        },
        {
            name: 'ft-get-supply',
            input_type: 'TokenName',
            output_type: 'uint',
            signature: '(ft-get-supply token-name)',
            description:
                '`ft-get-balance` returns `token-name` circulating supply.\nThe token type must have been defined using `define-fungible-token`.',
            example:
                "\n(define-fungible-token stackaroo)\n(ft-mint? stackaroo u100 'SZ2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR)\n(ft-get-supply stackaroo) ;; Returns u100\n",
        },
        {
            name: 'ft-burn?',
            input_type: 'TokenName, uint, principal',
            output_type: '(response bool uint)',
            signature: '(ft-burn? token-name amount sender)',
            description:
                '`ft-burn?` is used to decrease the token balance for the `sender` principal for a token\ntype defined using `define-fungible-token`. The decreased token balance is _not_ transfered to another principal, but\nrather destroyed, reducing the circulating supply.  \n\nIf a non-positive amount is provided to burn, this function returns `(err 1)`. Otherwise, on successfuly burn, it\nreturns `(ok true)`.\n',
            example:
                "\n(define-fungible-token stackaroo)\n(ft-mint? stackaroo u100 'SPAXYA5XS51713FDTQ8H94EJ4V579CXMTRNBZKSF) ;; Returns (ok true)\n(ft-burn? stackaroo u50 'SPAXYA5XS51713FDTQ8H94EJ4V579CXMTRNBZKSF) ;; Returns (ok true)\n",
        },
        {
            name: 'nft-burn?',
            input_type: 'AssetName, A, principal',
            output_type: '(response bool uint)',
            signature: '(nft-burn? asset-class asset-identifier recipient)',
            description:
                "`nft-burn?` is used to burn an asset and remove that asset's owner from the `recipient` principal.\nThe asset must have been defined using `define-non-fungible-token`, and the supplied `asset-identifier` must be of the same type specified in\nthat definition.\n\nIf an asset identified by `asset-identifier` _doesn't exist_, this function will return an error with the following error code:\n\n`(err u1)`\n\nOtherwise, on successfuly burn, it returns `(ok true)`.\n",
            example:
                '\n(define-non-fungible-token stackaroo (string-ascii 40))\n(nft-mint? stackaroo "Roo" \'SPAXYA5XS51713FDTQ8H94EJ4V579CXMTRNBZKSF) ;; Returns (ok true)\n(nft-burn? stackaroo "Roo" \'SPAXYA5XS51713FDTQ8H94EJ4V579CXMTRNBZKSF) ;; Returns (ok true)\n',
        },
        {
            name: 'stx-get-balance',
            input_type: 'principal',
            output_type: 'uint',
            signature: '(stx-get-balance owner)',
            description:
                "`stx-get-balance` is used to query the STX balance of the `owner` principal.\n\nThis function returns the STX balance of the `owner` principal. In the event that the `owner`\nprincipal isn't materialized, it returns 0.\n",
            example:
                "\n(stx-get-balance 'SZ2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR) ;; Returns u0\n(stx-get-balance (as-contract tx-sender)) ;; Returns u1000\n",
        },
        {
            name: 'stx-transfer?',
            input_type: 'uint, principal, principal',
            output_type: '(response bool uint)',
            signature: '(stx-transfer? amount sender recipient)',
            description:
                "`stx-transfer?` is used to increase the STX balance for the `recipient` principal\nby debiting the `sender` principal. The `sender` principal _must_ be equal to the current context's `tx-sender`.\n\nThis function returns (ok true) if the transfer is successful. In the event of an unsuccessful transfer it returns\none of the following error codes:\n\n`(err u1)` -- `sender` does not have enough balance to transfer\n`(err u2)` -- `sender` and `recipient` are the same principal\n`(err u3)` -- amount to send is non-positive\n`(err u4)` -- the `sender` principal is not the current `tx-sender`\n",
            example:
                "\n(as-contract\n  (stx-transfer? u60 tx-sender 'SZ2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR)) ;; Returns (ok true)\n(as-contract\n  (stx-transfer? u50 'SZ2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR tx-sender)) ;; Returns (err u4)\n",
        },
        {
            name: 'stx-burn?',
            input_type: 'uint, principal',
            output_type: '(response bool uint)',
            signature: '(stx-burn? amount sender)',
            description:
                "`stx-burn?` debits the `sender` principal's STX holdings by `amount`, destroying\nthe STX. The `sender` principal _must_ be equal to the current context's `tx-sender`.\n\nThis function returns (ok true) if the transfer is successful. In the event of an unsuccessful transfer it returns\none of the following error codes:\n\n`(err u1)` -- `sender` does not have enough balance to transfer\n`(err u3)` -- amount to send is non-positive\n`(err u4)` -- the `sender` principal is not the current `tx-sender`\n",
            example:
                "\n(as-contract\n  (stx-burn? u60 tx-sender)) ;; Returns (ok true)\n(as-contract\n  (stx-burn? u50 'SZ2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR)) ;; Returns (err u4)\n",
        },
        {
            name: 'define-constant',
            input_type: 'MethodSignature, MethodBody',
            output_type: 'Not Applicable',
            signature: '(define-constant name expression)',
            description:
                '`define-constant` is used to define a private constant value in a smart contract.\nThe expression passed into the definition is evaluated at contract launch, in the order that it is\nsupplied in the contract. This can lead to undefined function or undefined variable errors in the\nevent that a function or variable used in the expression has not been defined before the constant.\n\nLike other kinds of definition statements, `define-constant` may only be used at the top level of a smart contract\ndefinition (i.e., you cannot put a define statement in the middle of a function body).\n',
            example: '\n(define-constant four (+ 2 2))\n(+ 4 four) ;; Returns 8\n',
        },
        {
            name: 'define-private',
            input_type: 'MethodSignature, MethodBody',
            output_type: 'Not Applicable',
            signature:
                '(define-private (function-name (arg-name-0 arg-type-0) (arg-name-1 arg-type-1) ...) function-body)',
            description:
                '`define-private` is used to define _private_ functions for a smart contract. Private\nfunctions may not be called from other smart contracts, nor may they be invoked directly by users.\nInstead, these functions may only be invoked by other functions defined in the same smart contract.\n\nLike other kinds of definition statements, `define-private` may only be used at the top level of a smart contract\ndefinition (i.e., you cannot put a define statement in the middle of a function body).\n\nPrivate functions may return any type.',
            example:
                '\n(define-private (max-of (i1 int) (i2 int))\n  (if (> i1 i2)\n      i1\n      i2))\n(max-of 4 6) ;; Returns 6\n',
        },
        {
            name: 'define-public',
            input_type: 'MethodSignature, MethodBody',
            output_type: 'Not Applicable',
            signature:
                '(define-public (function-name (arg-name-0 arg-type-0) (arg-name-1 arg-type-1) ...) function-body)',
            description:
                '`define-public` is used to define a _public_ function and transaction for a smart contract. Public\nfunctions are callable from other smart contracts and may be invoked directly by users by submitting a transaction\nto the Stacks blockchain.\n\nLike other kinds of definition statements, `define-public` may only be used at the top level of a smart contract\ndefinition (i.e., you cannot put a define statement in the middle of a function body).\n\nPublic functions _must_ return a ResponseType (using either `ok` or `err`). Any datamap modifications performed by\na public function is aborted if the function returns an `err` type. Public functions may be invoked by other\ncontracts via `contract-call?`.',
            example:
                '\n(define-public (hello-world (input int))\n  (begin (print (+ 2 input))\n         (ok input)))\n',
        },
        {
            name: 'define-read-only',
            input_type: 'MethodSignature, MethodBody',
            output_type: 'Not Applicable',
            signature:
                '(define-read-only (function-name (arg-name-0 arg-type-0) (arg-name-1 arg-type-1) ...) function-body)',
            description:
                '`define-read-only` is used to define a _public read-only_ function for a smart contract. Such\nfunctions are callable from other smart contracts.\n\nLike other kinds of definition statements, `define-read-only` may only be used at the top level of a smart contract\ndefinition (i.e., you cannot put a define statement in the middle of a function body).\n\nRead-only functions may return any type. However, read-only functions\nmay not perform any datamap modifications, or call any functions which\nperform such modifications. This is enforced both during type checks and during\nthe execution of the function. Public read-only functions may\nbe invoked by other contracts via `contract-call?`.',
            example: '\n(define-read-only (just-return-one-hundred)\n  (* 10 10))',
        },
        {
            name: 'define-map',
            input_type: 'MapName, KeyTupleDefinition, MapTupleDefinition',
            output_type: 'Not Applicable',
            signature:
                '(define-map map-name ((key-name-0 key-type-0) ...) ((val-name-0 val-type-0) ...))',
            description:
                '`define-map` is used to define a new datamap for use in a smart contract. Such\nmaps are only modifiable by the current smart contract.\n\nMaps are defined with a key tuple type and value tuple type. These are defined using a list\nof name and type pairs, e.g., a key type might be `((id int))`, which is a tuple with a single "id"\nfield of type `int`.\n\nLike other kinds of definition statements, `define-map` may only be used at the top level of a smart contract\ndefinition (i.e., you cannot put a define statement in the middle of a function body).',
            example:
                '\n(define-map squares { x: int } { square: int })\n(define-private (add-entry (x int))\n  (map-insert squares { x: 2 } { square: (* x x) }))\n(add-entry 1)\n(add-entry 2)\n(add-entry 3)\n(add-entry 4)\n(add-entry 5)\n',
        },
        {
            name: 'define-data-var',
            input_type: 'VarName, TypeDefinition, Value',
            output_type: 'Not Applicable',
            signature: '(define-data-var var-name type value)',
            description:
                '`define-data-var` is used to define a new persisted variable for use in a smart contract. Such\nvariable are only modifiable by the current smart contract.\n\nPersisted variable are defined with a type and a value.\n\nLike other kinds of definition statements, `define-data-var` may only be used at the top level of a smart contract\ndefinition (i.e., you cannot put a define statement in the middle of a function body).',
            example:
                '\n(define-data-var size int 0)\n(define-private (set-size (value int))\n  (var-set size value))\n(set-size 1)\n(set-size 2)\n',
        },
        {
            name: 'define-fungible-token',
            input_type: 'TokenName, <uint>',
            output_type: 'Not Applicable',
            signature: '(define-fungible-token token-name <total-supply>)',
            description:
                '`define-fungible-token` is used to define a new fungible token class for use in the current contract.\n\nThe second argument, if supplied, defines the total supply of the fungible token. This ensures that all calls to the `ft-mint?`\nfunction will never be able to create more than `total-supply` tokens. If any such call were to increase the total supply\nof tokens passed that amount, that invocation of `ft-mint?` will result in a runtime error and abort.\n\nLike other kinds of definition statements, `define-fungible-token` may only be used at the top level of a smart contract\ndefinition (i.e., you cannot put a define statement in the middle of a function body).\n\nTokens defined using `define-fungible-token` may be used in `ft-transfer?`, `ft-mint?`, and `ft-get-balance` functions',
            example:
                '\n(define-fungible-token stacks)\n(define-fungible-token limited-supply-stacks u100)\n',
        },
        {
            name: 'define-non-fungible-token',
            input_type: 'AssetName, TypeSignature',
            output_type: 'Not Applicable',
            signature: '(define-non-fungible-token asset-name asset-identifier-type)',
            description:
                '`define-non-fungible-token` is used to define a new non-fungible token class for use in the current contract.\nIndividual assets are identified by their asset identifier, which must be of the type `asset-identifier-type`. Asset\nidentifiers are _unique_ identifiers.\n\nLike other kinds of definition statements, `define-non-fungible-token` may only be used at the top level of a smart contract\ndefinition (i.e., you cannot put a define statement in the middle of a function body).\n\nAssets defined using `define-non-fungible-token` may be used in `nft-transfer?`, `nft-mint?`, and `nft-get-owner?` functions',
            example: '\n(define-non-fungible-token names (buff 50))\n',
        },
        {
            name: 'define-trait',
            input_type: 'VarName, [MethodSignature]',
            output_type: 'Not Applicable',
            signature: '(define-trait trait-name ((func1-name (arg1-type arg2-type ...) (return-type))))',
            description:
                '`define-trait` is used to define a new trait definition for use in a smart contract. Other contracts\ncan implement a given trait and then have their contract identifier being passed as function arguments in order to be called\ndynamically with `contract-call?`.\n\nTraits are defined with a name, and a list functions defined with a name, a list of argument types, and return type.\n\nLike other kinds of definition statements, `define-trait` may only be used at the top level of a smart contract\ndefinition (i.e., you cannot put a define statement in the middle of a function body).\n',
            example:
                '\n(define-trait token-trait\n    ((transfer? (principal principal uint) (response uint uint))\n     (get-balance (principal) (response uint uint))))\n',
        },
        {
            name: 'use-trait',
            input_type: 'VarName, TraitIdentifier',
            output_type: 'Not Applicable',
            signature: '(use-trait trait-alias trait-identifier)',
            description:
                "`use-trait` is used to bring a trait, defined in another contract, to the current contract. Subsequent\nreferences to an imported trait are signaled with the syntax `<trait-alias>`.\n\nTraits import are defined with a name, used as an alias, and a trait identifier. Trait identifiers can either be\nusing the sugared syntax (.token-a.token-trait), or be fully qualified ('SPAXYA5XS51713FDTQ8H94EJ4V579CXMTRNBZKSF.token-a.token-trait).\n\nLike other kinds of definition statements, `use-trait` may only be used at the top level of a smart contract\ndefinition (i.e., you cannot put such a statement in the middle of a function body).\n    ",
            example:
                "\n(use-trait token-a-trait 'SPAXYA5XS51713FDTQ8H94EJ4V579CXMTRNBZKSF.token-a.token-trait)\n(define-public (forward-get-balance (user principal) (contract <token-a-trait>))\n  (begin\n    (ok 1)))\n",
        },
        {
            name: 'impl-trait',
            input_type: 'TraitIdentifier',
            output_type: 'Not Applicable',
            signature: '(impl-trait trait-identifier)',
            description:
                "`impl-trait` can be use for asserting that a contract is fully implementing a given trait.\nAdditional checks are being performed when the contract is being published, rejecting the deployment if the\ncontract is violating the trait specification.\n\nTrait identifiers can either be using the sugared syntax (.token-a.token-trait), or be fully qualified\n('SPAXYA5XS51713FDTQ8H94EJ4V579CXMTRNBZKSF.token-a.token-trait).\n\nLike other kinds of definition statements, `impl-trait` may only be used at the top level of a smart contract\ndefinition (i.e., you cannot put such a statement in the middle of a function body).\n",
            example: "\n(impl-trait 'SPAXYA5XS51713FDTQ8H94EJ4V579CXMTRNBZKSF.token-a.token-trait)\n",
        },
    ],
    keywords: [
        {
            name: 'contract-caller',
            output_type: 'principal',
            description:
                "Returns the caller of the current contract context. If this contract is the first one called by a signed transaction,\nthe caller will be equal to the signing principal. If `contract-call?` was used to invoke a function from a new contract, `contract-caller`\nchanges to the _calling_ contract's principal. If `as-contract` is used to change the `tx-sender` context, `contract-caller` _also_ changes\nto the same contract principal.",
            example:
                '(print contract-caller) ;; Will print out a Stacks address of the transaction sender',
        },
        {
            name: 'tx-sender',
            output_type: 'principal',
            description:
                'Returns the original sender of the current transaction, or if `as-contract` was called to modify the sending context, it returns that\ncontract principal.',
            example: '(print tx-sender) ;; Will print out a Stacks address of the transaction sender',
        },
        {
            name: 'block-height',
            output_type: 'uint',
            description: 'Returns the current block height of the Stacks blockchain as an uint',
            example:
                '(> block-height 1000) ;; returns true if the current block-height has passed 1000 blocks.',
        },
        {
            name: 'burn-block-height',
            output_type: 'uint',
            description: 'Returns the current block height of the underlying burn blockchain as a uint',
            example:
                '(> burn-block-height 1000) ;; returns true if the current height of the underlying burn blockchain has passed 1000 blocks.',
        },
        {
            name: 'none',
            output_type: '(optional ?)',
            description:
                'Represents the _none_ option indicating no value for a given optional (analogous to a null value).',
            example:
                '\n(define-public (only-if-positive (a int))\n  (if (> a 0)\n      (some a)\n      none))\n(only-if-positive 4) ;; Returns (some 4)\n(only-if-positive (- 3)) ;; Returns none\n',
        },
        {
            name: 'true',
            output_type: 'bool',
            description: 'Boolean true constant.',
            example: '\n(and true false) ;; Evaluates to false\n(or false true)  ;; Evaluates to true\n',
        },
        {
            name: 'false',
            output_type: 'bool',
            description: 'Boolean false constant.',
            example: '\n(and true false) ;; Evaluates to false\n(or false true)  ;; Evaluates to true\n',
        },
        {
            name: 'stx-liquid-supply',
            output_type: 'uint',
            description:
                'Returns the total number of micro-STX (uSTX) that are liquid in the system as of this block.',
            example: '(print stx-liquid-supply) ;; Will print out the total number of liquid uSTX',
        },
        {
            name: 'is-in-regtest',
            output_type: 'bool',
            description: 'Returns whether or not the code is running in a regression test',
            example:
                "(print is-in-regtest) ;; Will print 'true' if the code is running in a regression test",
        },
    ],
};