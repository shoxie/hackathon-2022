import * as Select from "@radix-ui/react-select";

const SelectionBox = () => {
  return (
    <div className="relative">
      <Select.Root>
        <Select.Trigger defaultValue="asdasd">
          <Select.Value />
          <Select.Icon />
        </Select.Trigger>

        <Select.Content>
          <Select.ScrollUpButton />
          <Select.Viewport>
            <Select.Item value="12">
              <Select.ItemText>12</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>

            <Select.Group>
              <Select.Label>1212</Select.Label>
              <Select.Item value="12">
                <Select.ItemText>12</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            </Select.Group>

            <Select.Separator />
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default SelectionBox;
