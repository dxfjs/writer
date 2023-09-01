# MText guide

## Adding a `MTEXT` entity

The `MTEXT` entity can be added to any layout (modelspace, paperspace or block) by the `addMText()` method.

```ts
modelSpace.addMText({
  height: 10,
  insertionPoint: point(15, 11),
  value: "Hello World!",
});
```

## XTextBuilder class

The `XTextBuilder` provide an esay interface to build `MText content`.

```ts
const builder = new TextBuilder();
const txt = builder.add({
  value: "Hello World!",
  fontFamily: "Arial",
  italic: true,
  colorNumber: Colors.Green,
});

const mtext = modelSpace.addMText({
  height: 10,
  insertionPoint: point(15, 11),
});

mtext.value = builder.value;
```

To create multiple lines you can mark the text as paragraph.

```ts
builder.add(
  {
    value: "Hello World!",
    fontFamily: "Arial",
    italic: true,
    colorNumber: Colors.Green,
  },
  true // This will make sure to add a line break.
);

builder.add({
  value: "Hello World!",
  fontFamily: "Arial",
  italic: true,
  colorNumber: Colors.Green,
});
```

The result will be.

```txt
{\C3;\fArial|i1;Hello World!}\P{\C3;\fArial|i1;Hello World!}
```

Or you can access the property `paragraph`.

```ts
txt1.paragraph = true;
```

You can create and style the text manually.

::: tip

You can find here ([ezdxf](https://ezdxf.readthedocs.io/en/stable/tutorials/mtext.htm)) more informations about `MText`:

- [MText Inline Codes](https://ezdxf.readthedocs.io/en/stable/dxfentities/mtext.html#mtext-inline-codes).
- [MText formatting](https://ezdxf.readthedocs.io/en/stable/tutorials/mtext.html#mtext-formatting).

:::
